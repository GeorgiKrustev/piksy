import { storageService } from './storageService'
import { MOCK_PRESENTS } from '../data/mockData'
import { createPresent, createGiftOption, createRecipient, PresentStatus } from '../types/models'
import { nowISO } from '../utils/helpers'

const KEY = 'presents'

function seed() {
  if (!storageService.get(KEY)) storageService.set(KEY, MOCK_PRESENTS)
}

function all() {
  seed()
  return /** @type {import('../types/models').PresentWebsite[]} */ (storageService.get(KEY) ?? [])
}

function persist(list) {
  storageService.set(KEY, list)
}

export const presentService = {
  // ------------------------------------------------------------------
  // Read
  // ------------------------------------------------------------------

  getAll() {
    return all()
  },

  getById(id) {
    return all().find((p) => p.id === id) ?? null
  },

  // ------------------------------------------------------------------
  // Create / Delete
  // ------------------------------------------------------------------

  /**
   * @param {{ title: string, recipientName: string, recipientEmail?: string|null, recipientRelationship?: string|null }} params
   * @returns {import('../types/models').PresentWebsite}
   */
  create({ title, recipientName, recipientEmail = null, recipientRelationship = null }) {
    const list    = all()
    const present = createPresent({
      title,
      recipient: createRecipient({
        name:         recipientName,
        email:        recipientEmail,
        relationship: recipientRelationship,
      }),
    })
    persist([...list, present])
    return present
  },

  delete(id) {
    persist(all().filter((p) => p.id !== id))
  },

  // ------------------------------------------------------------------
  // Update (generic + targeted helpers)
  // ------------------------------------------------------------------

  /** @returns {import('../types/models').PresentWebsite|null} */
  update(id, updates) {
    const list  = all()
    const index = list.findIndex((p) => p.id === id)
    if (index === -1) return null
    const updated = { ...list[index], ...updates, updatedAt: nowISO() }
    list[index]   = updated
    persist(list)
    return updated
  },

  updateTitle(id, title) {
    return this.update(id, { title })
  },

  updateRecipient(id, recipient) {
    return this.update(id, { recipient })
  },

  updateLandingPage(id, landingPage) {
    return this.update(id, { landingPage })
  },

  updateFinalScreen(id, finalScreen) {
    return this.update(id, { finalScreen })
  },

  updatePublishSettings(id, publishSettings) {
    return this.update(id, { publishSettings })
  },

  // ------------------------------------------------------------------
  // Gift options
  // ------------------------------------------------------------------

  /** @param {Partial<import('../types/models').GiftOption>} data */
  addGiftOption(presentId, data = {}) {
    const present = this.getById(presentId)
    if (!present) return null
    const option  = createGiftOption(presentId, {
      ...data,
      order: present.giftOptions.length,
    })
    return this.update(presentId, {
      giftOptions: [...present.giftOptions, option],
    })
  },

  updateGiftOption(presentId, optionId, updates) {
    const present = this.getById(presentId)
    if (!present) return null
    return this.update(presentId, {
      giftOptions: present.giftOptions.map((o) =>
        o.id === optionId ? { ...o, ...updates } : o
      ),
    })
  },

  removeGiftOption(presentId, optionId) {
    const present = this.getById(presentId)
    if (!present) return null
    return this.update(presentId, {
      giftOptions: present.giftOptions
        .filter((o) => o.id !== optionId)
        .map((o, i) => ({ ...o, order: i })),
    })
  },

  reorderGiftOptions(presentId, orderedIds) {
    const present = this.getById(presentId)
    if (!present) return null
    const map     = Object.fromEntries(present.giftOptions.map((o) => [o.id, o]))
    return this.update(presentId, {
      giftOptions: orderedIds.map((id, i) => ({ ...map[id], order: i })),
    })
  },

  // ------------------------------------------------------------------
  // Publish
  // ------------------------------------------------------------------

  publish(id) {
    const present = this.getById(id)
    if (!present) return null
    return this.update(id, {
      status: PresentStatus.PUBLISHED,
      publishSettings: {
        ...present.publishSettings,
        isPublished: true,
        publishedAt: nowISO(),
      },
    })
  },

  unpublish(id) {
    const present = this.getById(id)
    if (!present) return null
    return this.update(id, {
      status: PresentStatus.DRAFT,
      publishSettings: { ...present.publishSettings, isPublished: false },
    })
  },
}
