import React from 'react'

/**
 * QuestionPalette renders a numbered grid of 20 question buttons with distinct
 * color-coded status states and an explanatory legend.
 *
 * @param {object} props
 * @param {number} props.total - Total questions (20)
 * @param {number} props.currentIndex - 0-based active question index
 * @param {object} props.answers - Map of 0-based index -> selected answer letter
 * @param {Set<number>} props.markedForReview - Set of 0-based indices marked for review
 * @param {function} props.onNavigate - Callback fired when a question number is clicked
 */
export default function QuestionPalette({
  total = 20,
  currentIndex = 0,
  answers = {},
  markedForReview = new Set(),
  onNavigate,
}) {
  const getButtonState = (idx) => {
    const isCurrent = idx === currentIndex
    const isMarked = markedForReview.has(idx)
    const isAnswered = answers[idx] !== undefined && answers[idx] !== null && answers[idx] !== ''

    if (isCurrent) {
      return {
        className:
          'bg-indigo-600 text-white ring-2 ring-offset-2 ring-indigo-600 font-bold shadow',
        label: 'Current',
      }
    }
    if (isMarked) {
      return {
        className: 'bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-sm',
        label: 'Marked for Review',
      }
    }
    if (isAnswered) {
      return {
        className: 'bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm',
        label: 'Answered',
      }
    }
    return {
      className:
        'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 font-medium',
      label: 'Unanswered',
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900 text-sm">Question Palette</h4>
        <span className="text-xs text-gray-500 font-medium">
          {Object.values(answers).filter(Boolean).length}/{total} Answered
        </span>
      </div>

      {/* Grid of 20 questions */}
      <div
        className="grid grid-cols-5 gap-2"
        role="navigation"
        aria-label="Question palette"
      >
        {Array.from({ length: total }, (_, i) => {
          const state = getButtonState(i)
          return (
            <button
              key={i}
              type="button"
              onClick={() => onNavigate(i)}
              aria-label={`Go to question ${i + 1} (${state.label})`}
              className={`
                h-10 w-full rounded-lg text-sm transition-all duration-150 flex items-center justify-center
                focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                ${state.className}
              `}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="border-t border-gray-100 pt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-indigo-600 shrink-0" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-emerald-600 shrink-0" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-amber-500 shrink-0" />
          <span>Review</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-white border border-gray-300 shrink-0" />
          <span>Unanswered</span>
        </div>
      </div>
    </div>
  )
}
