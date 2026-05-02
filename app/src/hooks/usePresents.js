import { useState, useCallback } from 'react'
import { presentService } from '../services/presentService'

/**
 * usePresents — all state and actions for the Presents collection.
 *
 * Returns:
 *   presents  — current list
 *   actions   — stable object of CRUD functions (won't trigger re-renders when passed as props)
 *
 * Migration note:
 *   To move to a global store (Context / Zustand), lift `presents` state
 *   into a Provider and keep this hook as a selector + action dispatcher.
 */
export function usePresents() {
  const [presents, setPresents] = useState(() => presentService.getAll())

  const refresh = useCallback(() => {
    setPresents(presentService.getAll())
  }, [])

  const actions = {
    create(params) {
      const created = presentService.create(params)
      refresh()
      return created
    },

    update(id, updates) {
      const updated = presentService.update(id, updates)
      refresh()
      return updated
    },

    publish(id) {
      presentService.publish(id)
      refresh()
    },

    unpublish(id) {
      presentService.unpublish(id)
      refresh()
    },

    delete(id) {
      presentService.delete(id)
      refresh()
    },
  }

  return { presents, actions, refresh }
}
