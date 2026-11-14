import React from 'react'

/**
 * Animated Progress Bar displaying test completion status.
 *
 * @param {object} props
 * @param {number} props.current - Current question number (1-based)
 * @param {number} props.total - Total number of questions
 */
export default function ProgressBar({ current, total = 20 }) {
  const percentage = Math.min(100, Math.max(0, Math.round((current / total) * 100)))

  return (
    <div className="flex-1 max-w-xs sm:max-w-md mx-4">
      <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
        <span>Progress</span>
        <span className="font-medium text-gray-700">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Progress: question ${current} of ${total}`}
        />
      </div>
    </div>
  )
}
