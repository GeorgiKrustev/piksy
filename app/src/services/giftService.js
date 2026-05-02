import { storageService } from './storageService'
import { createGiftIdea } from '../types/models'
import { nowISO } from '../utils/helpers'

const KEY = 'gift_ideas'

function all() {
  return /** @type {import('../types/models').GiftIdea[]} */ (storageService.get(KEY) ?? [])
}

function persist(list) {
  storageService.set(KEY, list)
}

export const giftService = {
  // ------------------------------------------------------------------
  // Read
  // ------------------------------------------------------------------

  getAll() {
    return all()
  },

  getById(id) {
    return all().find((g) => g.id === id) ?? null
  },

  /** @param {string} query - searches title, description, tags */
  search(query) {
    const q = query.toLowerCase().trim()
    if (!q) return this.getAll()
    return all().filter((g) =>
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags.some((t) => t.toLowerCase().includes(q))
    )
  },

  /** @param {string} category */
  getByCategory(category) {
    return all().filter((g) => g.category === category)
  },

  // ------------------------------------------------------------------
  // Create / Delete
  // ------------------------------------------------------------------

  /** @param {Partial<import('../types/models').GiftIdea>} data */
  create(data) {
    const list = all()
    const idea = createGiftIdea(data)
    persist([...list, idea])
    return idea
  },

  delete(id) {
    persist(all().filter((g) => g.id !== id))
  },

  // ------------------------------------------------------------------
  // Update
  // ------------------------------------------------------------------

  /** @returns {import('../types/models').GiftIdea|null} */
  update(id, updates) {
    const list  = all()
    const index = list.findIndex((g) => g.id === id)
    if (index === -1) return null
    const updated = { ...list[index], ...updates, updatedAt: nowISO() }
    list[index]   = updated
    persist(list)
    return updated
  },
}
