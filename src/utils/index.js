// ============================================================
// Student Test Portal — Utility Functions
// ============================================================

import { CONFIG } from '../config.js'

export const SESSION_KEY = 'stp_session'

const OFFLINE_QUEUE_KEY = 'stp_offline_queue'

/**
 * Fisher-Yates shuffle — returns a new array, never mutates input.
 * @template T
 * @param {T[]} arr
 * @returns {T[]}
 */
export function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Formats a duration in seconds to "MM:SS" with leading zeros.
 * @param {number} seconds
 * @returns {string}
 */
export function formatTime(seconds) {
  const totalSeconds = Math.max(0, Math.floor(seconds))
  const mm = Math.floor(totalSeconds / 60)
  const ss = totalSeconds % 60
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
}

/**
 * Returns a promise that resolves after `ms` milliseconds.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Reads the offline queue from localStorage.
 * @returns {object[]}
 */
function readOfflineQueue() {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Writes the offline queue to localStorage.
 * @param {object[]} queue
 */
function writeOfflineQueue(queue) {
  try {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue))
  } catch {
    // localStorage quota exceeded or unavailable — silently ignore
  }
}

/**
 * Appends a payload to the offline queue in localStorage.
 * @param {object} payload
 */
function enqueueOffline(payload) {
  const queue = readOfflineQueue()
  queue.push(payload)
  writeOfflineQueue(queue)
}

/**
 * Submits a payload to the Apps Script web app with retry logic.
 *
 * Uses Content-Type: text/plain to avoid CORS preflight.
 * Retries up to `maxRetries` times (default 3) with exponential backoff:
 *   retry 1 → waits 1 s, retry 2 → waits 2 s, retry 3 → waits 4 s.
 *
 * On all failures or when the browser is offline, the payload is queued
 * in localStorage under the key 'stp_offline_queue'.
 *
 * @param {object} payload        — the data to POST
 * @param {number} [maxRetries=3] — maximum number of attempts
 * @returns {Promise<{ ok: true } | { queued: true }>}
 */
export async function submitWithRetry(payload, maxRetries = 3) {
  const url = CONFIG.APPS_SCRIPT_URL

  if (!url) {
    console.warn('[STP] APPS_SCRIPT_URL is not configured — queuing offline.')
    enqueueOffline(payload)
    return { queued: true }
  }

  // If the browser is already known to be offline, skip straight to queue.
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    console.warn('[STP] Browser is offline — queuing payload.')
    enqueueOffline(payload)
    return { queued: true }
  }

  let lastError

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    if (attempt > 1) {
      // Exponential backoff: 1s, 2s, 4s, …
      const backoffMs = 1000 * Math.pow(2, attempt - 2)
      await sleep(backoffMs)
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`)
      }

      const json = await response.json()

      if (json && json.ok) {
        return { ok: true }
      }

      // Server returned { ok: false, error: '...' } — do NOT retry (business logic error)
      throw new Error(json?.error || 'Server returned ok:false')
    } catch (err) {
      lastError = err
      console.warn(`[STP] Submit attempt ${attempt}/${maxRetries} failed:`, err.message)

      // If we've exhausted retries, fall through to queue
      if (attempt === maxRetries) break
    }
  }

  console.error('[STP] All submit attempts failed. Queuing payload.', lastError)
  enqueueOffline(payload)
  return { queued: true }
}

/**
 * Drains the localStorage offline queue, attempting to submit each payload.
 * Successfully submitted payloads are removed from the queue.
 * Failed payloads remain in the queue for a future retry.
 *
 * @returns {Promise<void>}
 */
export async function retryOfflineQueue() {
  const queue = readOfflineQueue()
  if (queue.length === 0) return

  console.log(`[STP] Retrying ${queue.length} offline payload(s)…`)

  const remaining = []

  for (const payload of queue) {
    try {
      const result = await submitWithRetry(payload)
      if (result.ok) {
        console.log('[STP] Offline payload submitted successfully.')
        // Successfully submitted — do not keep in queue
      } else {
        // Still queued (network failed again) — keep it
        remaining.push(payload)
      }
    } catch {
      remaining.push(payload)
    }
  }

  writeOfflineQueue(remaining)

  if (remaining.length === 0) {
    console.log('[STP] Offline queue cleared.')
  } else {
    console.warn(`[STP] ${remaining.length} payload(s) remain in the offline queue.`)
  }
}

/**
 * Initialises the offline-retry mechanism.
 *
 * Call once on app start. It immediately retries any queued payloads and
 * registers a listener so retries fire automatically whenever the browser
 * comes back online.
 *
 * @returns {void}
 */
export function loadOfflineRetry() {
  // Attempt an immediate drain in case payloads were queued in a previous session
  retryOfflineQueue()

  // Re-attempt every time the browser reports it is online
  window.addEventListener('online', () => {
    console.log('[STP] Browser came online — retrying offline queue.')
    retryOfflineQueue()
  })
}
