/**
 * Storage service — wraps localStorage.
 * Swap this out for real API calls when a backend is ready.
 * All methods are synchronous for now; the interface is designed to be
 * replaced with async/Promise equivalents without changing callers.
 */

const PREFIX = 'piksy_'

export const storageService = {
  get(key) {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch (e) {
      console.error('[storageService] Failed to write:', key, e)
    }
  },

  remove(key) {
    localStorage.removeItem(PREFIX + key)
  },

  clear() {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k))
  },
}
