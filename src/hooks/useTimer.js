import { useState, useEffect, useRef } from 'react'

/**
 * useTimer - Absolute-endTime countdown timer.
 * No decrement drift: each tick recomputes from endTime.
 *
 * @param {number} endTime - ms timestamp (Date.now() + duration)
 * @param {function} onExpire - called exactly once when time reaches 0
 * @returns {{ secondsLeft: number, displayTime: string, isExpired: boolean }}
 */
export function useTimer(endTime, onExpire) {
  const [secondsLeft, setSecondsLeft] = useState(() => Math.max(0, Math.ceil((endTime - Date.now()) / 1000)))
  const expiredRef = useRef(false)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire // keep fresh without re-running effect

  useEffect(() => {
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000))
      setSecondsLeft(remaining)
      if (remaining === 0 && !expiredRef.current) {
        expiredRef.current = true
        onExpireRef.current()
      }
    }
    tick() // run immediately
    const id = setInterval(tick, 500)
    return () => clearInterval(id)
  }, [endTime])

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const secs = String(secondsLeft % 60).padStart(2, '0')

  return {
    secondsLeft,
    displayTime: `${mins}:${secs}`,
    isExpired: expiredRef.current,
  }
}
