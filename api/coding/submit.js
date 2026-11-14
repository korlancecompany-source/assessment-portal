import { readFileSync } from 'fs'
import { join } from 'path'
import { verifyCodingToken } from '../_utils/token.js'
import { executeBatch } from '../_utils/judge0.js'
import { getAppsScriptUrl, getEnv } from '../_utils/env.js'

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
    const { token, language = 'Python 3', code = '', submissionType = 'Manual' } = body || {}

    const tokenData = verifyCodingToken(token)
    if (!tokenData) {
      return res.status(401).json({ ok: false, error: 'Invalid or expired session token.' })
    }

    const allTestCases = getTestCases()
    const questionCases = allTestCases[tokenData.questionId] || []
    const totalCases = questionCases.length || 5

    let passedCount = 0
    let evaluationFailed = false

    // If code is completely empty or whitespace, 0 marks directly
    if (!code || !code.trim()) {
      passedCount = 0
    } else {
      // Retry evaluation up to 3 times in case runner has temporary hiccup
      let attempt = 0
      let batchResults = null

      while (attempt < 3) {
        attempt++
        try {
          batchResults = await executeBatch(language, code, questionCases)
          break
        } catch (err) {
          console.warn(`[CodingSubmit] Grading attempt ${attempt} failed:`, err.message)
          if (attempt < 3) {
            await new Promise((r) => setTimeout(r, 1000 * attempt))
          }
        }
      }

      if (!batchResults) {
        evaluationFailed = true
      } else {
        passedCount = batchResults.filter((r) => r.status === 'Passed').length
      }
    }

    const CODING_MAX_MARKS = 10
    const marks = Math.round((passedCount / totalCases) * CODING_MAX_MARKS * 10) / 10

    const appsScriptUrl = getAppsScriptUrl()
    const appsScriptSecret = getEnv('APPS_SCRIPT_SECRET') || ''

    if (appsScriptUrl) {
      if (evaluationFailed) {
        // Send to CodingPending tab
        try {
          await fetch(appsScriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({
              action: 'codingPending',
              name: tokenData.name,
              email: tokenData.email,
              course: tokenData.course,
              language,
              code,
              reason: 'Execution service unavailable during submission',
            }),
          })
        } catch (err) {
          console.error('[CodingSubmit] Failed to log pending submission:', err)
        }
      } else {
        // Send evaluated mark to CodingResults tab
        try {
          await fetch(appsScriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({
              action: 'codingResult',
              secret: appsScriptSecret,
              name: tokenData.name,
              email: tokenData.email,
              phone: tokenData.phone,
              course: tokenData.course,
              language,
              testCasesPassed: passedCount,
              totalTestCases: totalCases,
              codingMarks: marks,
              maxMarks: CODING_MAX_MARKS,
              submissionType,
              warnings: tokenData.warningsUsed || 0,
              submittedAt: new Date().toISOString(),
            }),
          })
        } catch (err) {
          console.error('[CodingSubmit] Failed to log coding result to Apps Script:', err)
        }
      }
    }

    // Never return score or marks to student browser
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[CodingSubmit] Error:', err)
    return res.status(500).json({ ok: false, error: err.message })
  }
}
