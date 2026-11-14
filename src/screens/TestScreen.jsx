import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { CONFIG } from '../config'
import questionsData from '../data/questions.json'
import { shuffleArray, submitWithRetry, SESSION_KEY } from '../utils'
import { useFullscreenGuard } from '../hooks/useFullscreenGuard'
import { useAntiCopy } from '../hooks/useAntiCopy'
import Button from '../components/Button'
import Timer from '../components/Timer'
import QuestionCard from '../components/QuestionCard'
import QuestionPalette from '../components/QuestionPalette'
import Modal from '../components/Modal'
import ProgressBar from '../components/ProgressBar'

/**
 * Initializes or restores test session state from sessionStorage.
 */
function initSession(studentInfo) {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      // Check if session matches current student and course and has not expired
      if (
        saved &&
        saved.phase === 'test' &&
        saved.studentInfo?.email === studentInfo.email &&
        saved.studentInfo?.course === studentInfo.course &&
        saved.endTime > Date.now() &&
        Array.isArray(saved.questionIds) &&
        saved.questionIds.length > 0
      ) {
        return {
          questionIds: saved.questionIds,
          optionOrders: saved.optionOrders || {},
          answers: saved.answers || {},
          markedForReview: new Set(saved.markedForReview || []),
          endTime: saved.endTime,
          warnings: saved.warnings || 0,
          isResume: true,
        }
      }
    }
  } catch (err) {
    console.warn('[STP] Failed to restore session:', err)
  }

  // Fresh session: pick questions from selected course
  const courseQuestions = questionsData[studentInfo.course] || []
  if (courseQuestions.length === 0) {
    console.error(`[STP] No questions found for course: "${studentInfo.course}"`)
  }

  // Randomize question order
  const shuffledQuestions = shuffleArray(courseQuestions)
  const selectedQuestions = shuffledQuestions.slice(0, CONFIG.QUESTIONS_PER_TEST)
  const questionIds = selectedQuestions.map((q) => q.id)

  // Randomize option order per question for this student
  const optionOrders = {}
  for (const q of selectedQuestions) {
    optionOrders[q.id] = shuffleArray(['A', 'B', 'C', 'D'])
  }

  const endTime = Date.now() + CONFIG.TEST_DURATION_MIN * 60 * 1000

  return {
    questionIds,
    optionOrders,
    answers: {},
    markedForReview: new Set(),
    endTime,
    warnings: 0,
    isResume: false,
  }
}

export default function TestScreen({ studentInfo, onTestComplete }) {
  // Initialize or restore session once
  const sessionRef = useRef(null)
  if (!sessionRef.current) {
    sessionRef.current = initSession(studentInfo)
  }
  const session = sessionRef.current

  const [answers, setAnswers] = useState(session.answers)
  const [markedForReview, setMarkedForReview] = useState(session.markedForReview)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showTimeUpOverlay, setShowTimeUpOverlay] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentWarnings, setCurrentWarnings] = useState(session.warnings)

  const submittedRef = useRef(false)
  const answersRef = useRef(session.answers)
  answersRef.current = answers
  const currentWarningsRef = useRef(session.warnings)
  currentWarningsRef.current = currentWarnings

  // Map of all questions in this course by ID for quick lookup
  const questionsById = useMemo(() => {
    const list = questionsData[studentInfo.course] || []
    const map = {}
    for (const q of list) {
      map[q.id] = q
    }
    return map
  }, [studentInfo.course])

  // Submit test handler
  const handleSubmit = useCallback(
    async (submissionType = 'Manual') => {
      if (submittedRef.current) return
      submittedRef.current = true

      setShowSubmitModal(false)
      setIsSubmitting(true)

      const totalAllowedSec = CONFIG.TEST_DURATION_MIN * 60
      const remainingSec = Math.max(0, Math.ceil((session.endTime - Date.now()) / 1000))
      const timeTakenSec = Math.min(totalAllowedSec, Math.max(0, totalAllowedSec - remainingSec))

      const latestAnswers = answersRef.current || {}
      const answeredCount = Object.values(latestAnswers).filter(Boolean).length
      const warningsCount = currentWarningsRef.current || 0

      const payload = {
        name: studentInfo.name,
        email: studentInfo.email,
        phone: studentInfo.phone,
        course: studentInfo.course,
        resume: studentInfo.resume || null,
        answers: latestAnswers, // { [questionId]: "A" | "B" | "C" | "D" }
        answeredCount,
        timeTakenSec,
        submissionType,
        warningsUsed: warningsCount,
        submittedAt: new Date().toISOString(),
      }

      try {
        await submitWithRetry(payload)
      } catch (err) {
        console.error('[STP] Submit error:', err)
      }

      // Exit fullscreen safely
      if (document.fullscreenElement) {
        try {
          await document.exitFullscreen()
        } catch {
          // ignore
        }
      }

      onTestComplete({ submissionType, warningsUsed: warningsCount })
    },
    [onTestComplete, session.endTime, studentInfo]
  )

  // Auto-submit when timer expires (dispatched immediately to avoid loss on tab close)
  const handleTimeUp = useCallback(() => {
    setShowTimeUpOverlay(true)
    handleSubmit('Auto - Time Up')
  }, [handleSubmit])

  // Fullscreen & Anti-Cheat Guard
  const {
    requestFullscreen,
    violationCount,
    showWarningModal,
    dismissWarning,
  } = useFullscreenGuard({
    active: !submittedRef.current,
    maxWarnings: CONFIG.MAX_WARNINGS,
    countTabSwitch: CONFIG.COUNT_TAB_SWITCH_AS_VIOLATION,
    onViolation: (count) => {
      setCurrentWarnings(count)
    },
    onForceSubmit: () => {
      handleSubmit('Auto - Violation')
    },
  })

  // Block copy/paste/shortcuts throughout test
  useAntiCopy(!submittedRef.current)

  // Persist session state in sessionStorage
  useEffect(() => {
    if (submittedRef.current) return
    try {
      const dataToSave = {
        phase: 'test',
        studentInfo,
        questionIds: session.questionIds,
        optionOrders: session.optionOrders,
        answers,
        markedForReview: Array.from(markedForReview),
        endTime: session.endTime,
        warnings: violationCount,
      }
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(dataToSave))
    } catch (err) {
      console.warn('[STP] Failed to save session:', err)
    }
  }, [answers, markedForReview, session, studentInfo, violationCount])

  // Current question data
  const currentQId = session.questionIds[currentIndex]
  const currentQuestion = questionsById[currentQId]
  const currentDisplayOrder = session.optionOrders[currentQId] || ['A', 'B', 'C', 'D']
  const currentSelectedAnswer = answers[currentQId] || null

  const handleAnswerSelect = (optionKey) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQId]: optionKey,
    }))
  }

  const toggleMarkForReview = () => {
    setMarkedForReview((prev) => {
      const next = new Set(prev)
      if (next.has(currentIndex)) {
        next.delete(currentIndex)
      } else {
        next.add(currentIndex)
      }
      return next
    })
  }

  // Question navigation
  const goToPrev = () => setCurrentIndex((i) => Math.max(0, i - 1))
  const goToNext = () =>
    setCurrentIndex((i) => Math.min(session.questionIds.length - 1, i + 1))

  // Map answers by index for QuestionPalette
  const answersByIndex = useMemo(() => {
    const map = {}
    session.questionIds.forEach((qId, idx) => {
      if (answers[qId]) {
        map[idx] = answers[qId]
      }
    })
    return map
  }, [answers, session.questionIds])

  const answeredCount = Object.values(answers).filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col no-select">
      {/* Sticky Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 sm:px-8 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Course Name */}
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Course
            </p>
            <h2 className="text-sm sm:text-base font-bold text-gray-900 truncate max-w-[200px] sm:max-w-sm md:max-w-md">
              {studentInfo.course}
            </h2>
          </div>

          {/* Progress Bar */}
          <ProgressBar
            current={currentIndex + 1}
            total={session.questionIds.length || CONFIG.QUESTIONS_PER_TEST}
          />

          {/* Timer */}
          <div className="shrink-0">
            <Timer endTime={session.endTime} onExpire={handleTimeUp} />
          </div>
        </div>
      </header>

      {/* Main Test Layout (Blurred when warning modal active) */}
      <main
        className={`flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6 transition-all duration-200 ${
          showWarningModal ? 'filter blur-md pointer-events-none' : ''
        }`}
      >
        {/* Left: Question Card */}
        <div className="flex-1 min-w-0">
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={currentSelectedAnswer}
            onAnswer={handleAnswerSelect}
            displayOrder={currentDisplayOrder}
            questionNumber={currentIndex + 1}
            totalQuestions={session.questionIds.length || CONFIG.QUESTIONS_PER_TEST}
          />
        </div>

        {/* Right: Question Palette sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <QuestionPalette
            total={session.questionIds.length || CONFIG.QUESTIONS_PER_TEST}
            currentIndex={currentIndex}
            answers={answersByIndex}
            markedForReview={markedForReview}
            onNavigate={setCurrentIndex}
          />

          {/* Student Info Card */}
          <div className="mt-4 bg-white rounded-2xl p-4 border border-gray-200 text-xs text-gray-500 flex flex-col gap-1">
            <span className="font-semibold text-gray-700">{studentInfo.name}</span>
            <span className="truncate">{studentInfo.email}</span>
            {violationCount > 0 && (
              <span className="text-amber-600 font-medium mt-1">
                ⚠️ Warnings used: {violationCount}/{CONFIG.MAX_WARNINGS}
              </span>
            )}
          </div>
        </aside>
      </main>

      {/* Sticky Bottom Navigation Footer */}
      <footer className="bg-white border-t border-gray-200 sticky bottom-0 z-20 px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <Button
            variant="secondary"
            onClick={goToPrev}
            disabled={currentIndex === 0 || isSubmitting}
          >
            ← Previous
          </Button>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              onClick={toggleMarkForReview}
              disabled={isSubmitting}
              className={
                markedForReview.has(currentIndex)
                  ? 'text-amber-600 font-semibold'
                  : 'text-gray-600'
              }
            >
              {markedForReview.has(currentIndex)
                ? '★ Marked for Review'
                : '☆ Mark for Review'}
            </Button>

            <Button
              variant="danger"
              onClick={() => setShowSubmitModal(true)}
              disabled={isSubmitting}
            >
              Submit Test
            </Button>
          </div>

          <Button
            variant="secondary"
            onClick={goToNext}
            disabled={
              currentIndex === session.questionIds.length - 1 || isSubmitting
            }
          >
            Next →
          </Button>
        </div>
      </footer>

      {/* Warning Modal (Blocking, non-dismissible outside) */}
      <Modal
        isOpen={showWarningModal}
        title={`⚠️ Warning ${violationCount} of ${CONFIG.MAX_WARNINGS}`}
        footer={
          <Button
            variant="primary"
            onClick={async () => {
              dismissWarning()
              await requestFullscreen()
            }}
          >
            Return to Fullscreen
          </Button>
        }
      >
        <p className="mb-2">
          You exited fullscreen mode or navigated away from the test window.
        </p>
        <p className="font-medium text-amber-700 mb-2">
          {violationCount < CONFIG.MAX_WARNINGS
            ? `You have ${
                CONFIG.MAX_WARNINGS - violationCount
              } warning(s) remaining. Returning to fullscreen will resume the test.`
            : 'This is your final warning! Any further violation will automatically submit your test.'}
        </p>
        <p className="text-xs text-gray-500">
          The timer is still running. Please click "Return to Fullscreen" immediately.
        </p>
      </Modal>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        title="Submit Test?"
        onClose={() => setShowSubmitModal(false)}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowSubmitModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => handleSubmit('Manual')}
            >
              Yes, Submit Test
            </Button>
          </>
        }
      >
        <p className="mb-2">
          You have answered <strong>{answeredCount}</strong> of{' '}
          <strong>{session.questionIds.length}</strong> questions.
        </p>
        {answeredCount < session.questionIds.length && (
          <p className="text-amber-600 text-xs mb-2">
            ⚠️ You have {session.questionIds.length - answeredCount} unanswered
            question(s).
          </p>
        )}
        <p className="text-gray-600 text-xs">
          Once submitted, you cannot re-enter or change your answers. Are you
          sure you want to complete your test now?
        </p>
      </Modal>

      {/* Time's Up Fullscreen Overlay */}
      {showTimeUpOverlay && (
        <div className="fixed inset-0 bg-indigo-950/90 backdrop-blur-md z-50 flex items-center justify-center p-6 text-white text-center">
          <div className="max-w-md">
            <div className="text-6xl mb-4 animate-bounce">⏰</div>
            <h2 className="text-3xl font-extrabold mb-2">Time is Up!</h2>
            <p className="text-indigo-200 text-sm">
              Your test is being submitted automatically. Please wait...
            </p>
          </div>
        </div>
      )}

      {/* Submitting Loading Overlay */}
      {isSubmitting && !showTimeUpOverlay && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-md">
            <svg
              className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Submitting Test...
            </h3>
            <p className="text-sm text-gray-500">
              Saving your answers securely to the portal.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
