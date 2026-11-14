import React, { useState } from 'react'
import Button from '../components/Button'

export default function CodingIntroScreen({ studentInfo, warningsUsed = 0, onStartCoding }) {
  const [agreed, setAgreed] = useState(false)

  const handleStart = () => {
    if (!document.fullscreenElement) {
      try {
        document.documentElement.requestFullscreen?.().catch?.(() => {})
      } catch (e) {}
    }
    onStartCoding()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-2xl screen-enter">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              Round 2: Practical Assessment
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Coding Round — {studentInfo.course}
            </h1>
          </div>
          {warningsUsed > 0 && (
            <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium rounded-full">
              ⚠️ Warnings carried over: {warningsUsed}/3
            </span>
          )}
        </div>

        {/* Overview Box */}
        <div className="bg-indigo-50/60 rounded-xl p-4 border border-indigo-100 mb-6 text-sm text-indigo-950 flex flex-col sm:flex-row justify-between gap-3">
          <div>
            <span className="text-gray-500 block text-xs">Problem Count</span>
            <span className="font-semibold text-base">1 Scenario Question</span>
          </div>
          <div>
            <span className="text-gray-500 block text-xs">Allocated Time</span>
            <span className="font-semibold text-base">30 Minutes</span>
          </div>
          <div>
            <span className="text-gray-500 block text-xs">Maximum Marks</span>
            <span className="font-semibold text-base">10 Marks</span>
          </div>
          <div>
            <span className="text-gray-500 block text-xs">Languages</span>
            <span className="font-semibold text-base">Python 3, Java, C, C++</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">📋 Coding Rules & Environment</h2>
          <ol className="space-y-2.5 list-decimal list-inside text-gray-700 text-sm leading-relaxed">
            <li>
              Read standard input (<strong>stdin</strong>) and write your answer to standard output (<strong>stdout</strong>).
            </li>
            <li>
              You can test your code using the built-in <strong>Run</strong> button against both sample inputs and your own custom test cases.
            </li>
            <li>
              You have a maximum of <strong>15 runs</strong> during this session with a 5-second cooldown between consecutive runs.
            </li>
            <li>
              <strong>Fullscreen enforcement continues:</strong> Exiting fullscreen increases your violation count. After <strong>3 warnings</strong>, a 4th violation will auto-submit your code.
            </li>
            <li>
              <strong>Copying, pasting, and right-clicking are strictly disabled</strong> across the entire editor and prompt areas. All code must be typed directly.
            </li>
            <li>
              You may submit your solution at any time, even if you have not run the code. Unrun or empty code receives 0 marks.
            </li>
            <li>
              Final grading is performed against hidden test cases. You will not see your marks after submission.
            </li>
          </ol>
        </div>

        {/* Declaration */}
        <div className="border-t border-gray-100 pt-5 mb-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shrink-0"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
              I understand the coding round guidelines, and I am ready to begin my 30-minute timed coding session.
            </span>
          </label>
        </div>

        {/* Start Button */}
        <Button
          variant="primary"
          className="w-full py-3"
          disabled={!agreed}
          onClick={handleStart}
        >
          Start Coding Round →
        </Button>
      </div>
    </div>
  )
}
