import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * useFullscreenGuard
 * Monitors fullscreen state during the test phase and enforces anti-cheat rules.
 *
 * @param {object} opts
 * @param {function} opts.onViolation - Called with (count) when a new violation occurs
 * @param {function} opts.onForceSubmit - Called when violations exceed maxWarnings
 * @param {boolean} opts.active - Only enforce when true
 * @param {number} opts.maxWarnings - Max allowed warnings before force-submit
 * @param {boolean} opts.countTabSwitch - If true, treat visibilitychange/blur as violations too
 */
export function useFullscreenGuard({ onViolation, onForceSubmit, active, maxWarnings, countTabSwitch = false }) {
  const [violationCount, setViolationCount] = useState(0)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const violationCountRef = useRef(0) // keep in sync for use inside event handlers
  const lastTabViolationRef = useRef(0) // debounce tab switch (blur+visibilitychange fire together)

  const recordViolation = useCallback(() => {
    if (!active) return
    violationCountRef.current += 1
    const count = violationCountRef.current
    setViolationCount(count)
    if (count > maxWarnings) {
      onForceSubmit()
    } else {
      setShowWarningModal(true)
      onViolation(count)
    }
  }, [active, maxWarnings, onViolation, onForceSubmit])

  // Fullscreen change listener
  useEffect(() => {
    if (!active) return
    const handleFsChange = () => {
      if (!document.fullscreenElement) {
        recordViolation()
      }
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [active, recordViolation])

  // Tab switch / window blur listener (optional)
  useEffect(() => {
    if (!active || !countTabSwitch) return
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const now = Date.now()
        if (now - lastTabViolationRef.current > 1000) {
          lastTabViolationRef.current = now
          recordViolation()
        }
      }
    }
    const handleBlur = () => {
      const now = Date.now()
      if (now - lastTabViolationRef.current > 1000) {
        lastTabViolationRef.current = now
        recordViolation()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleBlur)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleBlur)
    }
  }, [active, countTabSwitch, recordViolation])

  const requestFs = useCallback(() => {
    return document.documentElement.requestFullscreen().catch(() => {})
  }, [])

  const dismissWarning = useCallback(() => {
    setShowWarningModal(false)
  }, [])

  return {
    isFullscreen: !!document.fullscreenElement,
    requestFullscreen: requestFs,
    violationCount,
    showWarningModal,
    dismissWarning,
  }
}
