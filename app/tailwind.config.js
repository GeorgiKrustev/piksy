import { colors, typography, shadows, radii, spacing } from './src/design-system/tokens.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors,
      fontFamily:    typography.fontFamily,
      fontSize:      typography.fontSize,
      fontWeight:    typography.fontWeight,
      letterSpacing: typography.letterSpacing,
      boxShadow:     shadows,
      borderRadius:  radii,
      spacing,
    },
  },
  plugins: [],
}
