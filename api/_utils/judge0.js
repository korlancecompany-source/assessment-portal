import { spawnSync } from 'child_process'
import { writeFileSync, unlinkSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import os from 'os'
import { getEnv } from './env.js'

let languageIdCache = null

/**
 * Normalizes language names to Judge0 / runner standards
 */
function normalizeLang(lang) {
  const l = (lang || '').toLowerCase()
  if (l.includes('python')) return 'python'
  if (l.includes('java')) return 'java'
  if (l.includes('c++') || l.includes('cpp')) return 'cpp'
  if (l === 'c') return 'c'
  return 'python'
}

/**
 * Dynamically queries Judge0 API for available language IDs
 */
async function getJudge0LanguageId(language, judge0Url, authToken) {
  const norm = normalizeLang(language)

  if (languageIdCache && languageIdCache[norm]) {
    return languageIdCache[norm]
  }

  try {
    const headers = { 'Content-Type': 'application/json' }
    if (authToken) {
      headers['X-Auth-Token'] = authToken
    }

    const res = await fetch(`${judge0Url}/languages`, { headers })
    if (res.ok) {
      const languages = await res.json()
      languageIdCache = {}

      for (const item of languages) {
        const name = item.name.toLowerCase()
        if (name.includes('python (3') && !languageIdCache['python']) {
          languageIdCache['python'] = item.id
        } else if (name.includes('java (openjdk') && !languageIdCache['java']) {
          languageIdCache['java'] = item.id
        } else if (name.includes('c++ (g++') && !languageIdCache['cpp']) {
          languageIdCache['cpp'] = item.id
        } else if (name.includes('c (gcc') && !languageIdCache['c']) {
          languageIdCache['c'] = item.id
        }
      }

      if (languageIdCache[norm]) {
        return languageIdCache[norm]
      }
    }
  } catch (err) {
    console.warn('[Judge0] Failed to fetch language list:', err.message)
  }

  // Common Judge0 CE standard default IDs
  const fallbackIds = {
    python: 71, // Python 3.8.1
    java: 62,   // Java (OpenJDK 13.0.1)
    c: 50,      // C (GCC 9.2.0)
    cpp: 54,    // C++ (GCC 9.2.0)
  }
  return fallbackIds[norm] || 71
}

/**
 * Trims trailing whitespace from each line and trailing blank lines
 */
export function normalizeOutput(text) {
  if (!text) return ''
  return text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trimEnd()
}

/**
 * Local fallback runner using native host tools if Judge0 is not configured
 */
function executeLocal(language, code, stdin) {
  const norm = normalizeLang(language)
  const tmpDir = os.tmpdir()

  if (norm === 'python') {
    const tmpFile = join(tmpDir, `stp_${Date.now()}_${Math.random().toString(36).substring(7)}.py`)
    try {
      writeFileSync(tmpFile, code, 'utf8')
      const result = spawnSync('python', [tmpFile], {
        input: stdin,
        encoding: 'utf8',
        timeout: 4000,
        maxBuffer: 1024 * 512,
      })

      if (result.error && result.error.code === 'ETIMEDOUT') {
        return { status: 'Time Limit', stdout: '', stderr: 'Time Limit Exceeded (4s)' }
      }

      if (result.status !== 0) {
        return {
          status: 'Runtime Error',
          stdout: result.stdout || '',
          stderr: result.stderr || 'Runtime error during execution',
        }
      }

      return {
        status: 'Success',
        stdout: result.stdout || '',
        stderr: result.stderr || '',
      }
    } catch (err) {
      return { status: 'Runtime Error', stdout: '', stderr: err.message }
    } finally {
      try { unlinkSync(tmpFile) } catch {}
    }
  }

  // If compiler is missing on host, provide friendly mock message
  return {
    status: 'Runtime Error',
    stdout: '',
    stderr: `Local runner for ${language} requires Judge0 CE instance or host compiler. Please configure JUDGE0_URL.`,
  }
}

/**
 * Executes code on a single input via Judge0 CE or local fallback
 */
export async function execute(language, code, stdin) {
  const judge0Url = getEnv('JUDGE0_URL')
  const authToken = getEnv('JUDGE0_AUTH_TOKEN')

  if (!judge0Url) {
    return executeLocal(language, code, stdin)
  }

  const languageId = await getJudge0LanguageId(language, judge0Url, authToken)
  const isJava = normalizeLang(language) === 'java'
  const cpuLimit = isJava ? 5.0 : 2.0
  const memoryLimit = isJava ? 262144 : 131072 // KB

  const headers = { 'Content-Type': 'application/json' }
  if (authToken) headers['X-Auth-Token'] = authToken

  try {
    const submitRes = await fetch(`${judge0Url}/submissions?wait=true&base64_encoded=false`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: stdin || '',
        cpu_time_limit: cpuLimit,
        memory_limit: memoryLimit,
        max_file_size: 1024,
        enable_network: false,
      }),
    })

    if (!submitRes.ok) {
      throw new Error(`Judge0 HTTP ${submitRes.status}: ${await submitRes.text()}`)
    }

    const data = await submitRes.json()
    const statusDesc = data.status?.description || ''

    if (data.status?.id === 3) {
      return { status: 'Success', stdout: data.stdout || '', stderr: data.stderr || '' }
    }
    if (data.status?.id === 6) {
      return { status: 'Compile Error', stdout: '', stderr: data.compile_output || 'Compilation failed' }
    }
    if (data.status?.id === 5) {
      return { status: 'Time Limit', stdout: '', stderr: 'Time Limit Exceeded' }
    }

    return {
      status: 'Runtime Error',
      stdout: data.stdout || '',
      stderr: data.stderr || data.message || statusDesc,
    }
  } catch (err) {
    console.warn('[Judge0] Error executing code via API, falling back to local:', err.message)
    return executeLocal(language, code, stdin)
  }
}

/**
 * Batch executes code against multiple test inputs
 * @param {string} language
 * @param {string} code
 * @param {Array<{ input: string, expected?: string, caseNumber: number }>} testCases
 */
export async function executeBatch(language, code, testCases) {
  const results = []

  // Execute cases sequentially or in parallel batches
  for (const tc of testCases) {
    const res = await execute(language, code, tc.input)

    const actual = normalizeOutput(res.stdout)
    const expected = normalizeOutput(tc.expected || '')
    let status = 'Passed'

    if (res.status === 'Compile Error') {
      status = 'Compile Error'
    } else if (res.status === 'Time Limit') {
      status = 'Time Limit'
    } else if (res.status === 'Runtime Error') {
      status = 'Runtime Error'
    } else if (expected && actual !== expected) {
      status = 'Failed'
    }

    results.push({
      caseNumber: tc.caseNumber,
      status,
      stdout: res.stdout,
      stderr: res.stderr,
      actual,
    })
  }

  return results
}
