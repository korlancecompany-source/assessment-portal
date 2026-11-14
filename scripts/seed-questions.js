import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// Read part1 and part2 questions JSON
const part1 = JSON.parse(readFileSync(join(root, 'src/data/questions_part1.json'), 'utf8'))
const part2 = JSON.parse(readFileSync(join(root, 'src/data/questions_part2.json'), 'utf8'))

// Merge questions
const mergedQuestions = { ...part1, ...part2 }
const courseCount = Object.keys(mergedQuestions).length
const questionCount = Object.values(mergedQuestions).reduce((acc, qs) => acc + qs.length, 0)

writeFileSync(join(root, 'src/data/questions.json'), JSON.stringify(mergedQuestions, null, 2))
console.log(`✅ questions.json written (${questionCount} questions across ${courseCount} courses)`)

// Read part1 and part2 answer keys
const part1Csv = readFileSync(join(root, 'src/data/answer_key_part1.csv'), 'utf8').trim().split('\n')
const part2Csv = readFileSync(join(root, 'src/data/answer_key_part2.csv'), 'utf8').trim().split('\n')

const header = 'id,correct'
const part1Rows = part1Csv.slice(1).map(r => r.trim()).filter(Boolean)
const part2Rows = part2Csv.slice(1).map(r => r.trim()).filter(Boolean)

const mergedCsv = [header, ...part1Rows, ...part2Rows].join('\n') + '\n'
writeFileSync(join(root, 'answer_key.csv'), mergedCsv)
console.log(`✅ answer_key.csv written (${part1Rows.length + part2Rows.length} rows)`)
