import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

/**
 * Robust environment variable reader.
 * Checks process.env first (for Vercel / Docker / production),
 * then falls back to parsing .env file directly (for local Node / Vite dev).
 */
export function getEnv(key) {
  if (process.env[key]) return process.env[key]

  try {
    const envPath = join(process.cwd(), '.env')
    if (existsSync(envPath)) {
      const content = readFileSync(envPath, 'utf8')
      for (const line of content.split('\n')) {
        const trimmed = line.trim()
        if (trimmed && !trimmed.startsWith('#')) {
          const idx = trimmed.indexOf('=')
          if (idx !== -1) {
            const k = trimmed.substring(0, idx).trim()
            const v = trimmed.substring(idx + 1).trim()
            if (k === key) return v
          }
        }
      }
    }
  } catch (err) {
    console.warn(`[getEnv] Error reading .env for key ${key}:`, err.message)
  }

  return ''
}

export function getAppsScriptUrl() {
  return (
    getEnv('APPS_SCRIPT_URL') ||
    getEnv('VITE_APPS_SCRIPT_URL') ||
    ''
  )
}
