import React, { useEffect } from 'react'
import { SESSION_KEY } from '../utils'
import companyLogo from '../assets/company-logo.jpg'

/**
 * Screen 4: Test Completed Screen
 * 
 * - Safely exits fullscreen
 * - Clears session storage to prevent re-entry
 * - Displays official completion acknowledgement with company branding
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
      sessionStorage.removeItem('stp_coding_session')
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
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 w-full max-w-lg text-center screen-enter">
        {/* Company Photo / Branding */}
        <div className="flex justify-center mb-6">
          <img
            src={companyLogo}
            alt="Korlance Logo"
            className="w-36 sm:w-44 h-auto object-contain drop-shadow-sm rounded-xl"
          />
        </div>

        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 shadow-inner">
          <svg
            className="w-8 h-8"
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Test Completed!
        </h1>

        {/* Messages */}
        <p className="text-gray-600 font-medium mb-1.5 leading-relaxed">
          Your responses have been recorded successfully.
        </p>

        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Thank you for taking the assessment. Your result will be evaluated and shared by the <strong className="text-indigo-950">Korlance</strong> management team.
        </p>

        {/* Notice Card */}
        <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200/60 mb-6 text-xs text-gray-500 leading-relaxed">
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
