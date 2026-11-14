import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const EXPECTED_COURSES = [
  "Full Stack Web Development",
  "Data Science",
  "Cloud Computing",
  "Artificial Intelligence & Machine Learning (AIML)",
  "UI-UX",
  "Auto CAD & CATIA",
  "Cyber Security",
  "VLSI",
  "Python with Data Science",
  "Python with Machine Learning",
  "Human Resource",
  "Data Analytics",
  "Digital Marketing",
  "Internet of Things (IOT)",
  "Embedded System",
  "Hybrid Electric Vehicles",
  "App Development",
  "Agriculture Domains",
  "Auto CAD, SketchUp, Revit"
]

export function validate() {
  const questionsPath = join(root, 'src', 'data', 'questions.json')
  const answerKeyPath = join(root, 'answer_key.csv')

  if (!existsSync(questionsPath)) {
    console.error('❌ Error: src/data/questions.json not found.')
    process.exit(1)
  }

  const rawQuestions = readFileSync(questionsPath, 'utf8')
  let questionsData
  try {
    questionsData = JSON.parse(rawQuestions)
  } catch (err) {
    console.error('❌ Error parsing questions.json:', err.message)
    process.exit(1)
  }

  // Read answer_key.csv
  let answerKeyMap = new Map()
  if (existsSync(answerKeyPath)) {
    const lines = readFileSync(answerKeyPath, 'utf8').trim().split('\n')
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue
      const [id, correct] = line.split(',').map(s => s.trim())
      if (id && correct) {
        answerKeyMap.set(id, correct.toUpperCase())
      }
    }
  }

  const allSeenIds = new Set()
  const summary = []
  let totalErrors = 0

  for (const courseName of EXPECTED_COURSES) {
    const courseQuestions = questionsData[courseName]
    const courseIssues = []

    if (!courseQuestions) {
      courseIssues.push(`Missing course "${courseName}"`)
      totalErrors++
      summary.push({ course: courseName, count: 0, issues: courseIssues })
      continue
    }

    if (!Array.isArray(courseQuestions)) {
      courseIssues.push(`Questions for "${courseName}" is not an array`)
      totalErrors++
      summary.push({ course: courseName, count: 0, issues: courseIssues })
      continue
    }

    if (courseQuestions.length !== 20) {
      courseIssues.push(`Expected 20 questions, found ${courseQuestions.length}`)
      totalErrors++
    }

    const seenQuestionTexts = new Set()
    const letterCounts = { A: 0, B: 0, C: 0, D: 0 }

    for (let qIdx = 0; qIdx < courseQuestions.length; qIdx++) {
      const q = courseQuestions[qIdx]
      const qPrefix = `Q${qIdx + 1} (${q?.id || 'NO-ID'})`

      if (!q.id) {
        courseIssues.push(`${qPrefix}: Missing question id`)
        totalErrors++
      } else if (allSeenIds.has(q.id)) {
        courseIssues.push(`${qPrefix}: Duplicate question id "${q.id}"`)
        totalErrors++
      } else {
        allSeenIds.add(q.id)
      }

      // Check question text
      const qText = (q.question || '').trim()
      if (!qText) {
        courseIssues.push(`${qPrefix}: Empty question text`)
        totalErrors++
      } else {
        // Must not start with Word + number + colon (e.g. "Tool 4:", "Process 19:")
        if (/^[a-zA-Z]+\s+\d+\s*:/i.test(qText)) {
          courseIssues.push(`${qPrefix}: Starts with category prefix "${qText.substring(0, 20)}..."`)
          totalErrors++
        }
        // Must not contain placeholder, [, TODO, lorem (case-insensitive)
        if (/placeholder|\[|TODO|lorem/i.test(qText)) {
          courseIssues.push(`${qPrefix}: Contains placeholder tag/brackets in text: "${qText.substring(0, 30)}..."`)
          totalErrors++
        }

        const normalizedQ = qText.toLowerCase().replace(/\s+/g, ' ')
        if (seenQuestionTexts.has(normalizedQ)) {
          courseIssues.push(`${qPrefix}: Duplicate question text in course`)
          totalErrors++
        } else {
          seenQuestionTexts.add(normalizedQ)
        }
      }

      // Check options
      const options = q.options
      if (!options || typeof options !== 'object') {
        courseIssues.push(`${qPrefix}: Missing options object`)
        totalErrors++
      } else {
        const requiredKeys = ['A', 'B', 'C', 'D']
        const actualKeys = Object.keys(options)
        const hasAllKeys = requiredKeys.every(k => actualKeys.includes(k)) && actualKeys.length === 4
        if (!hasAllKeys) {
          courseIssues.push(`${qPrefix}: Options must have exactly keys A, B, C, D (found ${actualKeys.join(',')})`)
          totalErrors++
        }

        const seenOptionTexts = new Set()
        for (const key of requiredKeys) {
          const optText = (options[key] || '').trim()
          if (!optText) {
            courseIssues.push(`${qPrefix}: Option ${key} is empty`)
            totalErrors++
          } else {
            // Check for placeholder text
            if (/placeholder/i.test(optText)) {
              courseIssues.push(`${qPrefix}: Option ${key} contains "placeholder"`)
              totalErrors++
            }
            if (/^(wrong|correct)\s+(option|answer)/i.test(optText)) {
              courseIssues.push(`${qPrefix}: Option ${key} has placeholder label "${optText}"`)
              totalErrors++
            }

            const normOpt = optText.toLowerCase().replace(/\s+/g, ' ')
            if (seenOptionTexts.has(normOpt)) {
              courseIssues.push(`${qPrefix}: Duplicate option text "${optText}" inside question`)
              totalErrors++
            } else {
              seenOptionTexts.add(normOpt)
            }
          }
        }
      }

      // Check Answer Key
      if (q.id) {
        if (!answerKeyMap.has(q.id)) {
          courseIssues.push(`${qPrefix}: Question id not found in answer_key.csv`)
          totalErrors++
        } else {
          const ans = answerKeyMap.get(q.id)
          if (!['A', 'B', 'C', 'D'].includes(ans)) {
            courseIssues.push(`${qPrefix}: Invalid answer "${ans}" in answer_key.csv (must be A, B, C, or D)`)
            totalErrors++
          } else {
            letterCounts[ans] = (letterCounts[ans] || 0) + 1
          }
        }
      }
    }

    // Check letter distribution: no letter appears more than 8 times in a course
    for (const l of ['A', 'B', 'C', 'D']) {
      if (letterCounts[l] > 8) {
        courseIssues.push(`Answer "${l}" appears ${letterCounts[l]} times (max allowed: 8)`)
        totalErrors++
      }
    }

    summary.push({
      course: courseName,
      count: courseQuestions.length,
      issues: courseIssues,
      letterCounts
    })
  }

  // Also check if answer_key.csv has dangling IDs not in questions
  for (const [keyId] of answerKeyMap.entries()) {
    if (!allSeenIds.has(keyId)) {
      totalErrors++
      console.warn(`⚠️ Warning: answer_key.csv has ID "${keyId}" which does not exist in questions.json`)
    }
  }

  // Print Summary Table
  console.log('\n================================================================================')
  console.log('                        QUESTION BANK VALIDATION REPORT                         ')
  console.log('================================================================================')
  console.log(
    'Course'.padEnd(46) +
    'Questions'.padEnd(12) +
    'Keys (A/B/C/D)'.padEnd(18) +
    'Status'
  )
  console.log('-'.repeat(86))

  for (const row of summary) {
    const letters = row.letterCounts ? `${row.letterCounts.A}/${row.letterCounts.B}/${row.letterCounts.C}/${row.letterCounts.D}` : 'N/A'
    const status = row.issues.length === 0 ? '✅ PASS' : `❌ ${row.issues.length} issue(s)`
    console.log(
      row.course.padEnd(46) +
      String(row.count).padEnd(12) +
      letters.padEnd(18) +
      status
    )
    if (row.issues.length > 0) {
      for (const issue of row.issues.slice(0, 5)) {
        console.log(`   - ${issue}`)
      }
      if (row.issues.length > 5) {
        console.log(`   ... and ${row.issues.length - 5} more issue(s)`)
      }
    }
  }

  console.log('================================================================================')
  if (totalErrors === 0) {
    console.log(`✅ ALL 19 COURSES PASSED VALIDATION! (380 valid questions & matching answer keys)\n`)
    return true
  } else {
    console.log(`❌ VALIDATION FAILED WITH ${totalErrors} TOTAL ISSUE(S).\n`)
    return false
  }
}

// CLI Execution
if (process.argv[1] && process.argv[1].endsWith('validate-questions.mjs')) {
  const success = validate()
  if (!success) {
    process.exit(1)
  }
}
