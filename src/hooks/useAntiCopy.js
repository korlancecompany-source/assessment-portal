import { useEffect } from 'react'

/**
 * useAntiCopy - Blocks copy/paste and DevTools keyboard shortcuts during the test.
 * @param {boolean} active - Only blocks when true
 */
export function useAntiCopy(active) {
  useEffect(() => {
    if (!active) return

    const preventDefault = (e) => { e.preventDefault(); e.stopPropagation() }

    const handleKeyDown = (e) => {
      const ctrl = e.ctrlKey || e.metaKey
      // F12
      if (e.key === 'F12') { preventDefault(e); return }
      // Ctrl/Cmd + C, V, X, A, P, S, U
      if (ctrl && ['c','v','x','a','p','s','u'].includes(e.key.toLowerCase())) { preventDefault(e); return }
      // Ctrl+Shift+I/J/C (DevTools)
      if (ctrl && e.shiftKey && ['i','j','c'].includes(e.key.toLowerCase())) { preventDefault(e); return }
    }

    const events = ['copy', 'cut', 'paste', 'contextmenu', 'selectstart', 'dragstart']
    events.forEach(evt => document.addEventListener(evt, preventDefault))
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      events.forEach(evt => document.removeEventListener(evt, preventDefault))
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [active])
}
