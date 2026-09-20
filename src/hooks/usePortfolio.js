import { useEffect, useState } from 'react'
import fallbackDb from '../../db.json'

/**
 * Where the live API lives, if anywhere.
 *
 * - Set VITE_API_URL to point at a real json-server deployment.
 * - Otherwise we only assume localhost in dev. A static production build (a
 *   Netlify deploy, say) has no json-server behind it, and reaching for
 *   http://localhost:4000 from an HTTPS page is blocked as mixed content
 *   anyway — so production renders straight from the bundled db.json.
 */
export const API =
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000' : '')

/** True when a live API is configured; false on a plain static deploy. */
export const HAS_API = Boolean(API)

// Collections mirrored from db.json. json-server exposes each top-level key
// as its own endpoint, so we fan out and rebuild the same shape client-side.
const COLLECTIONS = [
  'profile',
  'stats',
  'spheres',
  'toolCategories',
  'experience',
  'projects',
  'education',
  'certifications',
  'languages',
  'navigation',
]

/**
 * Loads the portfolio from the json-server API when one is configured, falling
 * back to the bundled db.json otherwise (or when the API is unreachable).
 * db.json stays the single source of truth either way — the fallback is the
 * very same file, imported at build time — so the site never renders empty.
 */
export function usePortfolio() {
  const [data, setData] = useState(null)
  const [source, setSource] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    // No API configured: use the bundled copy immediately, no network at all.
    if (!HAS_API) {
      setData(fallbackDb)
      setSource('local')
      return
    }

    let cancelled = false
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 4000)

    async function load() {
      try {
        const responses = await Promise.all(
          COLLECTIONS.map((key) =>
            fetch(`${API}/${key}`, { signal: controller.signal }).then((res) => {
              if (!res.ok) throw new Error(`${key}: HTTP ${res.status}`)
              return res.json()
            }),
          ),
        )

        if (cancelled) return
        const next = Object.fromEntries(COLLECTIONS.map((key, i) => [key, responses[i]]))
        setData(next)
        setSource('api')
      } catch (err) {
        if (cancelled) return
        // Expected whenever `npm run api` is not running — not a failure state.
        setData(fallbackDb)
        setSource('local')
        setError(err.message)
      } finally {
        clearTimeout(timeout)
      }
    }

    load()
    return () => {
      cancelled = true
      clearTimeout(timeout)
      controller.abort()
    }
  }, [])

  return { data, source, error, loading: data === null }
}
