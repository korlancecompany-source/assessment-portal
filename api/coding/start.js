import { readFileSync } from 'fs'
import { join } from 'path'
import { signCodingToken } from '../_utils/token.js'
import { getAppsScriptUrl } from '../_utils/env.js'

let questionsData = null

function getQuestions() {
  if (!questionsData) {
    const filePath = join(process.cwd(), 'src', 'data', 'coding-questions.json')
    questionsData = JSON.parse(readFileSync(filePath, 'utf8'))
  }
  return questionsData
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const { name, email, phone, course, warningsUsed = 0 } = body || {}

    if (!email || !course) {
      return res.status(400).json({ ok: false, error: 'Missing email or course' })
    }

    const allQuestions = getQuestions()
    const courseQuestions = allQuestions[course]

    if (!courseQuestions || courseQuestions.length === 0) {
      return res.status(400).json({ ok: false, error: `No coding questions for course "${course}"` })
    }

    // Pick question deterministically or randomly (first question of course set)
    const question = courseQuestions[0]
    const appsScriptUrl = getAppsScriptUrl()

    let startedAt = new Date().toISOString()
    let isResume = false

    // Sync session with Apps Script if configured
    if (appsScriptUrl) {
      try {
        const asRes = await fetch(appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            action: 'codingStart',
            email,
            course,
            questionId: question.id,
          }),
        })
        const asData = await asRes.json()
        if (asData && asData.ok) {
          if (asData.startedAt) startedAt = asData.startedAt
          isResume = asData.isResume
        } else if (asData && asData.error) {
          return res.status(400).json({ ok: false, error: asData.error })
        }
      } catch (err) {
        console.warn('[CodingStart] Apps Script sync failed, continuing locally:', err.message)
      }
    }

    const DURATION_MS = 30 * 60 * 1000 // 30 minutes
    const startTimeMs = new Date(startedAt).getTime()
    const endsAt = startTimeMs + DURATION_MS

    // Check if session has already expired
    if (Date.now() > endsAt) {
      return res.status(400).json({ ok: false, error: 'Coding round duration has already expired.' })
    }

    // Sign session token
    const token = signCodingToken({
      name,
      email,
      phone,
      course,
      questionId: question.id,
      endsAt,
      warningsUsed,
    })

    return res.status(200).json({
      ok: true,
      token,
      question: {
        id: question.id,
        course: question.course,
        title: question.title,
        scenario: question.scenario,
        inputFormat: question.inputFormat,
        outputFormat: question.outputFormat,
        constraints: question.constraints,
        sampleInput: question.sampleInput,
        sampleOutput: question.sampleOutput,
        explanation: question.explanation,
        starterCode: question.starterCode,
      },
      endsAt,
      isResume,
    })
  } catch (err) {
    console.error('[CodingStart] Error:', err)
    return res.status(500).json({ ok: false, error: err.message })
  }
}
