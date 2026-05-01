import { clsx } from 'clsx'

const variants = {
  default:  'bg-stone-100  text-stone-500',
  warm:     'bg-cream-200  text-stone-600',
  success:  'bg-green-100  text-green-700',
  warning:  'bg-amber-100  text-amber-700',
  error:    'bg-red-100    text-red-600',
  info:     'bg-blue-100   text-blue-600',
  brand:    'bg-terracotta-100 text-terracotta-600',
}

const sizes = {
  sm: 'h-5 px-2   text-2xs',
  md: 'h-6 px-2.5 text-xs',
  lg: 'h-7 px-3   text-sm',
}

/**
 * @param {{
 *   variant?: keyof typeof variants
 *   size?: keyof typeof sizes
 *   dot?: boolean
 *   className?: string
 *   children?: React.ReactNode
 * }} props
 */
export function Badge({ variant = 'default', size = 'md', dot = false, className, children }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium rounded-full whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span className={clsx('w-1.5 h-1.5 rounded-full', {
          'bg-stone-400':      variant === 'default',
          'bg-stone-500':      variant === 'warm',
          'bg-green-500':      variant === 'success',
          'bg-amber-500':      variant === 'warning',
          'bg-red-500':        variant === 'error',
          'bg-blue-500':       variant === 'info',
          'bg-terracotta-500': variant === 'brand',
        })} />
      )}
      {children}
    </span>
  )
}
