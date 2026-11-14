import React, { useState, useEffect, useRef } from 'react'

/**
 * Countdown timer using absolute endTime (no drift).
 * 
 * Props:
 * @param {number} endTime - ms timestamp (e.g. Date.now() + durationMs)
 * @param {function} onExpire - callback fired once when timer hits 0
 */
export default function Timer({ endTime, onExpire }) {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.ceil((endTime - Date.now()) / 1000))
  )
  const expiredRef = useRef(false)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000))
      setSecondsLeft(remaining)
      if (remaining === 0 && !expiredRef.current) {
        expiredRef.current = true
        if (onExpireRef.current) onExpireRef.current()
      }
    }

    tick()
    const id = setInterval(tick, 500)
    return () => clearInterval(id)
  }, [endTime])

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const secs = String(secondsLeft % 60).padStart(2, '0')

  const colorClass =
    secondsLeft <= 60
      ? 'animate-pulse-red'
      : secondsLeft <= 300
      ? 'text-amber-500'
      : 'text-gray-700'

  return (
    <div
      className={`flex items-center gap-2 font-mono text-xl sm:text-2xl font-bold ${colorClass}`}
      role="timer"
      aria-label="Remaining test time"
      aria-live="off"
    >
      <svg
        className="w-5 h-5 opacity-75 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>
        {mins}:{secs}
      </span>
    </div>
  )
}
