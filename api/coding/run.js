import { readFileSync } from 'fs'
import { join } from 'path'
import { verifyCodingToken } from '../_utils/token.js'
import { execute, executeBatch } from '../_utils/judge0.js'

let testCasesData = null

function getTestCases() {
  if (!testCasesData) {
    const filePath = join(process.cwd(), 'api', '_data', 'coding-testcases.json')
    testCasesData = JSON.parse(readFileSync(filePath, 'utf8'))
  }
  return testCasesData
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const { token, language, code, customInput = '' } = body || {}

    const tokenData = verifyCodingToken(token)
    if (!tokenData) {
      return res.status(401).json({ ok: false, error: 'Invalid or expired session token.' })
    }

    if (Date.now() > tokenData.endsAt) {
      return res.status(400).json({ ok: false, error: 'Coding session time has expired.' })
    }

    if (!code || !code.trim()) {
      return res.status(400).json({ ok: false, error: 'No code provided.' })
    }

    const allTestCases = getTestCases()
    const questionCases = allTestCases[tokenData.questionId] || []

    // 1. Run on Custom Input (for Output tab)
    const customResult = await execute(language, code, customInput)

    // 2. Batch run on all 5 test cases
    const batchResults = await executeBatch(language, code, questionCases)

    // Format results: NEVER expose hidden inputs or expected outputs for cases 2-5
    const sanitizedTestCases = batchResults.map((result) => {
      if (result.caseNumber === 1) {
        return {
          caseNumber: 1,
          status: result.status,
          input: questionCases[0]?.input || '',
          expected: questionCases[0]?.expected || '',
          actual: result.actual,
        }
      }
      return {
        caseNumber: result.caseNumber,
        status: result.status,
      }
    })

    return res.status(200).json({
      ok: true,
      customOutput: {
        stdout: customResult.stdout || '',
        stderr: customResult.stderr || '',
        status: customResult.status,
      },
      testCases: sanitizedTestCases,
    })
  } catch (err) {
    console.error('[CodingRun] Error:', err)
    return res.status(500).json({ ok: false, error: err.message })
  }
}
