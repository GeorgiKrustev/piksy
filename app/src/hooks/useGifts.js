import { useState, useCallback } from 'react'
import { giftService } from '../services/giftService'

/**
 * useGifts — state and actions for the Gift Ideas library.
 *
 * Returns:
 *   ideas     — current list
 *   actions   — stable CRUD + search actions
 */
export function useGifts() {
  const [ideas, setIdeas] = useState(() => giftService.getAll())

  const refresh = useCallback(() => {
    setIdeas(giftService.getAll())
  }, [])

  const actions = {
    create(data) {
      const created = giftService.create(data)
      refresh()
      return created
    },

    update(id, updates) {
      const updated = giftService.update(id, updates)
      refresh()
      return updated
    },

    delete(id) {
      giftService.delete(id)
      refresh()
    },

    search(query) {
      setIdeas(giftService.search(query))
    },

    filterByCategory(category) {
      setIdeas(category ? giftService.getByCategory(category) : giftService.getAll())
    },

    clearFilters() {
      setIdeas(giftService.getAll())
    },
  }

  return { ideas, actions, refresh }
}
