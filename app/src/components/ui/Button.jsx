import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'

const variants = {
  primary:   'bg-terracotta-500 text-white hover:bg-terracotta-600 active:bg-terracotta-700 shadow-soft',
  secondary: 'bg-cream-200 text-stone-700 hover:bg-cream-300 active:bg-stone-100',
  ghost:     'text-stone-500 hover:bg-cream-200 hover:text-stone-700 active:bg-cream-300',
  outline:   'border border-stone-200 text-stone-600 hover:bg-cream-200 hover:border-stone-300',
  danger:    'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-soft',
}

const sizes = {
  xs: 'h-6  px-2.5 text-xs  gap-1   rounded-lg',
  sm: 'h-8  px-3   text-sm  gap-1.5 rounded-xl',
  md: 'h-9  px-4   text-sm  gap-2   rounded-xl',
  lg: 'h-11 px-5   text-base gap-2  rounded-xl',
}

/**
 * @param {{
 *   variant?: keyof typeof variants
 *   size?: keyof typeof sizes
 *   loading?: boolean
 *   leftIcon?: React.ReactNode
 *   rightIcon?: React.ReactNode
 *   className?: string
 *   children?: React.ReactNode
 * } & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export function Button({
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center font-medium transition-all duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400/50 focus-visible:ring-offset-1',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  )
}
