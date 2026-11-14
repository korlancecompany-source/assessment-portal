import React from 'react'

const POSITION_LABELS = ['A', 'B', 'C', 'D']

/**
 * Question card displaying the question prompt and 4 interactive option buttons.
 *
 * @param {object} props
 * @param {object} props.question - { id, question, options: { A, B, C, D } }
 * @param {string|null} props.selectedAnswer - Original letter key ('A'|'B'|'C'|'D') or null
 * @param {function} props.onAnswer - Callback fired with selected original letter key
 * @param {string[]} [props.displayOrder] - Order of original keys to display, e.g. ['B','A','D','C']
 * @param {number} props.questionNumber - 1-based index
 * @param {number} [props.totalQuestions=20]
 */
export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
  displayOrder = ['A', 'B', 'C', 'D'],
  questionNumber,
  totalQuestions = 20,
}) {
  if (!question) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center text-gray-400">
        Loading question...
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 flex flex-col gap-6">
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>

      {/* Question Text */}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-relaxed">
        {question.question}
      </h3>

      {/* Options List */}
      <div className="flex flex-col gap-3 pt-2" role="group" aria-label="Answer options">
        {displayOrder.map((origKey, idx) => {
          const optionText = question.options[origKey]
          const isSelected = selectedAnswer === origKey
          const positionLabel = POSITION_LABELS[idx] || origKey

          return (
            <button
              key={origKey}
              type="button"
              onClick={() => onAnswer(origKey)}
              aria-pressed={isSelected}
              className={`
                w-full text-left p-4 rounded-xl border-2 transition-all duration-150
                flex items-center gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-medium shadow-sm'
                    : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50/70 text-gray-700'
                }
              `}
            >
              {/* Option Letter Circle */}
              <span
                className={`
                  w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0 transition-colors
                  ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                  }
                `}
              >
                {positionLabel}
              </span>

              {/* Option Text */}
              <span className="flex-1 text-sm sm:text-base leading-normal">
                {optionText}
              </span>

              {/* Radio Indicator */}
              <span
                className={`
                  w-5 h-5 rounded-full border flex items-center justify-center shrink-0
                  ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-gray-300 group-hover:border-gray-400'
                  }
                `}
              >
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
