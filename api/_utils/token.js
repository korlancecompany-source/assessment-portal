import crypto from 'crypto'

const DEFAULT_SECRET = 'stp-coding-session-secret-salt-2026'

/**
 * Creates an HMAC-SHA256 signed session token for a coding round.
 * 
 * @param {object} payload - { email, course, questionId, endsAt, warningsUsed, name, phone }
 * @param {string} [secret]
 * @returns {string} base64-encoded token: payload.signature
 */
export function signCodingToken(payload, secret = process.env.SESSION_SECRET || DEFAULT_SECRET) {
  const dataStr = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto
    .createHmac('sha256', secret)
    .update(dataStr)
    .digest('base64url')
  return `${dataStr}.${signature}`
}

/**
 * Verifies an HMAC-SHA256 coding session token.
 * 
 * @param {string} token
 * @param {string} [secret]
 * @returns {object|null} Decoded payload or null if invalid
 */
export function verifyCodingToken(token, secret = process.env.SESSION_SECRET || DEFAULT_SECRET) {
  if (!token || typeof token !== 'string') return null
  const parts = token.split('.')
  if (parts.length !== 2) return null

  const [dataStr, signature] = parts
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(dataStr)
    .digest('base64url')

  if (signature !== expectedSignature) return null

  try {
    const jsonStr = Buffer.from(dataStr, 'base64url').toString('utf8')
    const payload = JSON.parse(jsonStr)
    return payload
  } catch {
    return null
  }
}
