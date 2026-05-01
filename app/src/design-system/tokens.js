/**
 * Piksy Design Tokens
 * Single source of truth for all visual constants.
 * Imported by tailwind.config.js so Tailwind classes always match.
 */

// ---------------------------------------------------------------------------
// Color palette
// ---------------------------------------------------------------------------

export const colors = {
  // Warm neutrals — the core palette
  cream: {
    50:  '#FDFAF7',
    100: '#FAF6F0', // page background
    200: '#F5EDE0', // subtle hover / sidebar
    300: '#EDE0CC', // pressed states
  },
  stone: {
    50:  '#F5F0EB',
    100: '#E8DDD0', // borders, dividers
    200: '#D4C4B0', // disabled borders
    300: '#B8A492', // placeholder text
    400: '#8B7B6B', // muted text / icons
    500: '#6B5A4A', // secondary text
    600: '#5C4B3C',
    700: '#4A3828',
    800: '#2A2520', // primary text
    900: '#1A1512',
  },
  // Terracotta — primary brand / CTA
  terracotta: {
    50:  '#FDF3EF',
    100: '#FAE0D6',
    200: '#F0B99D',
    300: '#E08D6A',
    400: '#D4835D',
    500: '#C76B4F', // primary CTA
    600: '#A85638',
    700: '#8A3F25',
    800: '#6B2D16',
    900: '#4D1F0A',
  },
  // Semantic aliases
  white: '#FFFFFF',
  black: '#000000',
}

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const typography = {
  fontFamily: {
    sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'ui-sans-serif', 'sans-serif'],
    serif: ['Georgia', 'ui-serif', 'serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
  },
  fontSize: {
    '2xs': ['0.6875rem', { lineHeight: '1rem' }],
    xs:   ['0.75rem',   { lineHeight: '1.125rem' }],
    sm:   ['0.875rem',  { lineHeight: '1.375rem' }],
    base: ['1rem',      { lineHeight: '1.5rem' }],
    lg:   ['1.125rem',  { lineHeight: '1.75rem' }],
    xl:   ['1.25rem',   { lineHeight: '1.875rem' }],
    '2xl':['1.5rem',    { lineHeight: '2rem' }],
    '3xl':['1.875rem',  { lineHeight: '2.25rem' }],
    '4xl':['2.25rem',   { lineHeight: '2.5rem' }],
  },
  fontWeight: {
    normal:   '400',
    medium:   '500',
    semibold: '600',
    bold:     '700',
  },
  letterSpacing: {
    tight:  '-0.02em',
    normal: '0em',
    wide:   '0.04em',
    wider:  '0.08em',
    widest: '0.16em',
  },
}

// ---------------------------------------------------------------------------
// Shadows
// ---------------------------------------------------------------------------

export const shadows = {
  soft:    '0 1px 3px rgba(42,37,32,0.06), 0 1px 2px rgba(42,37,32,0.04)',
  card:    '0 2px 8px rgba(42,37,32,0.08), 0 1px 3px rgba(42,37,32,0.05)',
  lifted:  '0 4px 16px rgba(42,37,32,0.10), 0 2px 6px rgba(42,37,32,0.06)',
  modal:   '0 12px 40px rgba(42,37,32,0.18), 0 4px 12px rgba(42,37,32,0.08)',
  inner:   'inset 0 1px 3px rgba(42,37,32,0.08)',
}

// ---------------------------------------------------------------------------
// Border radius
// ---------------------------------------------------------------------------

export const radii = {
  sm:   '6px',
  md:   '8px',
  lg:   '10px',
  xl:   '12px',
  '2xl':'16px',
  '3xl':'24px',
  full: '9999px',
}

// ---------------------------------------------------------------------------
// Spacing — only additions on top of Tailwind's scale
// ---------------------------------------------------------------------------

export const spacing = {
  18: '4.5rem',
  22: '5.5rem',
  sidebar: '240px',
  builderNav: '200px',
  builderPreview: '320px',
}

// ---------------------------------------------------------------------------
// Animation / transition
// ---------------------------------------------------------------------------

export const transitions = {
  fast:   '100ms ease',
  base:   '150ms ease',
  slow:   '250ms ease',
  spring: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
}
