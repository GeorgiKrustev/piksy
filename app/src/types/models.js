/**
 * Piksy data models.
 *
 * Two layers:
 *   1. JSDoc @typedef — IDE type support today, migrate to .ts tomorrow.
 *   2. Factory functions — single place to construct valid objects with defaults.
 *      Always use these instead of raw object literals so shape never drifts.
 *
 * TypeScript migration: swap @typedef for interface/type, remove JSDoc casts.
 */

import { generateId, nowISO, slugify } from '../utils/helpers'

// ---------------------------------------------------------------------------
// Enums (as const objects — TS-compatible pattern)
// ---------------------------------------------------------------------------

/** @readonly */
export const PresentStatus = /** @type {const} */ ({
  DRAFT:     'draft',
  PUBLISHED: 'published',
  ARCHIVED:  'archived',
})

/** @readonly */
export const GiftCategory = /** @type {const} */ ({
  EXPERIENCE: 'Experience',
  TECH:       'Tech',
  FASHION:    'Fashion',
  HOME:       'Home',
  FOOD:       'Food & Drink',
  WELLNESS:   'Wellness',
  BOOKS:      'Books',
  TRAVEL:     'Travel',
  ART:        'Art & Creative',
  OTHER:      'Other',
})

export const GIFT_CATEGORIES = Object.values(GiftCategory)

/** @readonly */
export const SectionType = /** @type {const} */ ({
  TEXT:  'text',
  IMAGE: 'image',
  LIST:  'list',
  QUOTE: 'quote',
})

/** @readonly */
export const BuilderStep = /** @type {const} */ ({
  LANDING: 'landing',
  GIFTS:   'gifts',
  DETAILS: 'details',
  FINAL:   'final',
  PUBLISH: 'publish',
})

export const BUILDER_STEPS = [
  { id: BuilderStep.LANDING, label: 'Landing Page',    description: 'The first thing they see'    },
  { id: BuilderStep.GIFTS,   label: 'Gift Options',    description: "What you're offering"        },
  { id: BuilderStep.DETAILS, label: 'Detail Pages',    description: 'Tell the story of each gift' },
  { id: BuilderStep.FINAL,   label: 'Final Screen',    description: 'End on a high note'           },
  { id: BuilderStep.PUBLISH, label: 'Publish & Share', description: 'Send it to the world'        },
]

// ---------------------------------------------------------------------------
// Type definitions
// ---------------------------------------------------------------------------

/**
 * @typedef {'draft'|'published'|'archived'} PresentStatusValue
 * @typedef {'Experience'|'Tech'|'Fashion'|'Home'|'Food & Drink'|'Wellness'|'Books'|'Travel'|'Art & Creative'|'Other'} GiftCategoryValue
 * @typedef {'text'|'image'|'list'|'quote'} SectionTypeValue
 * @typedef {'warm'|'cool'|'minimal'} Theme
 */

/**
 * @typedef {Object} Recipient
 * @property {string}      id
 * @property {string}      name
 * @property {string|null} email
 * @property {string|null} relationship
 */

/**
 * @typedef {Object} DetailSection
 * @property {string}           id
 * @property {SectionTypeValue} type
 * @property {string}           content
 */

/**
 * @typedef {Object} GiftOption
 * @property {string}          id
 * @property {string}          presentId
 * @property {string|null}     giftIdeaId
 * @property {string}          title
 * @property {string}          description
 * @property {string}          priceRange
 * @property {string|null}     imageUrl
 * @property {DetailSection[]} detailSections
 * @property {number}          order
 */

/**
 * @typedef {Object} GiftIdea
 * @property {string}            id
 * @property {string}            title
 * @property {string}            description
 * @property {GiftCategoryValue} category
 * @property {string}            priceRange
 * @property {string[]}          tags
 * @property {string|null}       imageUrl
 * @property {string}            createdAt
 * @property {string}            updatedAt
 */

/**
 * @typedef {Object} LandingPage
 * @property {string}      heroTitle
 * @property {string}      heroSubtitle
 * @property {string}      heroMessage
 * @property {string|null} heroImageUrl
 * @property {Theme}       theme
 */

/**
 * @typedef {Object} FinalScreen
 * @property {string} title
 * @property {string} message
 * @property {string} ctaLabel
 */

/**
 * @typedef {Object} PublishSettings
 * @property {boolean}     isPublished
 * @property {string|null} publishedAt
 * @property {string|null} slug
 * @property {boolean}     requiresPassword
 * @property {string|null} password
 * @property {string|null} expiresAt
 */

/**
 * @typedef {Object} PresentWebsite
 * @property {string}             id
 * @property {string}             title
 * @property {Recipient}          recipient
 * @property {PresentStatusValue} status
 * @property {LandingPage}        landingPage
 * @property {GiftOption[]}       giftOptions
 * @property {FinalScreen}        finalScreen
 * @property {PublishSettings}    publishSettings
 * @property {string}             createdAt
 * @property {string}             updatedAt
 */

/**
 * @typedef {Object} User
 * @property {string}       id
 * @property {string}       name
 * @property {string}       email
 * @property {string|null}  avatarUrl
 * @property {'free'|'pro'} plan
 * @property {string}       createdAt
 */

/**
 * @typedef {Object} Collaborator
 * @property {string}            id
 * @property {string}            userId
 * @property {string}            presentId
 * @property {'editor'|'viewer'} role
 * @property {string}            invitedAt
 */

// ---------------------------------------------------------------------------
// Factory functions
// ---------------------------------------------------------------------------

/** @returns {Recipient} */
export function createRecipient(overrides = {}) {
  return {
    id:           'rec_' + generateId(),
    name:         '',
    email:        null,
    relationship: null,
    ...overrides,
  }
}

/** @returns {DetailSection} */
export function createDetailSection(overrides = {}) {
  return {
    id:      'sec_' + generateId(),
    type:    SectionType.TEXT,
    content: '',
    ...overrides,
  }
}

/**
 * @param {string} presentId
 * @param {Partial<GiftOption>} overrides
 * @returns {GiftOption}
 */
export function createGiftOption(presentId, overrides = {}) {
  return {
    id:             'gopt_' + generateId(),
    presentId,
    giftIdeaId:     null,
    title:          '',
    description:    '',
    priceRange:     '',
    imageUrl:       null,
    detailSections: [],
    order:          0,
    ...overrides,
  }
}

/** @returns {LandingPage} */
export function createLandingPage(recipientName = '') {
  return {
    heroTitle:    recipientName ? `A gift for ${recipientName}` : '',
    heroSubtitle: '',
    heroMessage:  '',
    heroImageUrl: null,
    theme:        'warm',
  }
}

/** @returns {FinalScreen} */
export function createFinalScreen() {
  return {
    title:    'With love',
    message:  '',
    ctaLabel: 'Send my choice',
  }
}

/** @returns {PublishSettings} */
export function createPublishSettings(title = '') {
  return {
    isPublished:      false,
    publishedAt:      null,
    slug:             slugify(title),
    requiresPassword: false,
    password:         null,
    expiresAt:        null,
  }
}

/**
 * @param {Partial<PresentWebsite>} overrides
 * @returns {PresentWebsite}
 */
export function createPresent(overrides = {}) {
  const now       = nowISO()
  const recipient = overrides.recipient ?? createRecipient()
  const title     = overrides.title ?? ''
  return {
    id:              'pres_' + generateId(),
    title,
    recipient,
    status:          PresentStatus.DRAFT,
    landingPage:     createLandingPage(recipient.name),
    giftOptions:     [],
    finalScreen:     createFinalScreen(),
    publishSettings: createPublishSettings(title),
    createdAt:       now,
    updatedAt:       now,
    ...overrides,
    // Re-apply these after spread so overrides.recipient doesn't silently break them
    recipient,
  }
}

/**
 * @param {Partial<GiftIdea>} overrides
 * @returns {GiftIdea}
 */
export function createGiftIdea(overrides = {}) {
  const now = nowISO()
  return {
    id:          'idea_' + generateId(),
    title:       '',
    description: '',
    category:    GiftCategory.OTHER,
    priceRange:  '',
    tags:        [],
    imageUrl:    null,
    createdAt:   now,
    updatedAt:   now,
    ...overrides,
  }
}
