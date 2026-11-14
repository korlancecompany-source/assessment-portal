import React, { useState } from 'react'
import Button from '../components/Button'

const INSTRUCTIONS = [
  <>This test contains <strong>20 multiple-choice questions</strong>.</>,
  <>You have <strong>20 minutes</strong> to complete the test. The timer starts when you click "Start Test".</>,
  <>The test will <strong>auto-submit</strong> when the timer reaches 0:00.</>,
  <>You must remain in <strong>fullscreen mode</strong> throughout the test.</>,
  <>You will receive a <strong>warning</strong> each time you exit fullscreen. After <strong>3 warnings</strong>, your test will be auto-submitted.</>,
  <>Each question has <strong>4 options</strong> — select the best answer. You can change your answer at any time before submitting.</>,
  <>Use the <strong>question palette</strong> on the right to navigate between questions.</>,
  <><strong>Copying, pasting, right-clicking, and DevTools shortcuts are disabled</strong> during the test.</>,
  <>Your results will be <strong>shared by the management</strong> after evaluation. You will not see your score here.</>,
]

export default function InstructionsScreen({ studentInfo, onStartTest }) {
  const [agreed, setAgreed] = useState(false)

  const handleStart = () => {
    if (!document.fullscreenElement) {
      try {
        document.documentElement.requestFullscreen?.().catch?.(() => {})
      } catch (e) {}
    }
    onStartTest()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl screen-enter">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {studentInfo.name}!
          </h1>
          <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full mt-2">
            {studentInfo.course}
          </span>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">📋 Test Instructions</h2>
          <ol className="space-y-3 list-decimal list-inside">
            {INSTRUCTIONS.map((item, idx) => (
              <li key={idx} className="text-gray-700 text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ol>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6" />

        {/* Declaration */}
        <label className="flex items-start gap-3 cursor-pointer mb-6 group">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shrink-0"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
            I have read the above instructions and I will attend this test honestly without any malpractice.
          </span>
        </label>

        {/* Start Button */}
        <Button
          variant="primary"
          className="w-full"
          disabled={!agreed}
          onClick={handleStart}
        >
          Start Test →
        </Button>
      </div>
    </div>
  )
}
