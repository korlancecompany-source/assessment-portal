import React, { useEffect } from 'react'
import { SESSION_KEY } from '../utils'

/**
 * Screen 4: Test Completed Screen
 * 
 * - Safely exits fullscreen
 * - Clears session storage to prevent re-entry
 * - Displays official completion acknowledgement
 * - Never shows scores, correctness, or answer breakdowns
 */
export default function CompletedScreen() {
  useEffect(() => {
    // 1. Exit fullscreen mode if active
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    }

    // 2. Clear any lingering session state
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      // ignore
    }

    // 3. Block browser back navigation from re-entering
    window.history.pushState(null, '', window.location.href)
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12 w-full max-w-lg text-center screen-enter">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 shadow-inner">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Test Completed!
        </h1>

        {/* Messages */}
        <p className="text-gray-600 font-medium mb-2 leading-relaxed">
          Your responses have been recorded successfully.
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          Your result will be shared by the management after official evaluation.
        </p>

        {/* Notice Card */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/60 mb-6 text-xs text-gray-500 leading-relaxed">
          🔒 For security, this test session is now sealed. Retaking or revisiting the test questions is not permitted.
        </div>

        {/* Instruction */}
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          You can safely close this page now
        </p>
      </div>
    </div>
  )
}
