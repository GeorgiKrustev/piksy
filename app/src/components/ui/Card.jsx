import { clsx } from 'clsx'

const variants = {
  default:  'bg-white border border-stone-100 shadow-soft',
  elevated: 'bg-white shadow-card',
  warm:     'bg-cream-100 border border-stone-100',
  ghost:    'bg-cream-200',
  flat:     'bg-white border border-stone-100',
}

/**
 * @param {{
 *   variant?: keyof typeof variants
 *   hoverable?: boolean
 *   clickable?: boolean
 *   padding?: 'none'|'sm'|'md'|'lg'
 *   className?: string
 *   children?: React.ReactNode
 * } & React.HTMLAttributes<HTMLDivElement>} props
 */
export function Card({
  variant   = 'default',
  hoverable = false,
  clickable = false,
  padding   = 'md',
  className,
  children,
  ...props
}) {
  const pad = {
    none: '',
    sm:   'p-4',
    md:   'p-5',
    lg:   'p-6',
  }

  return (
    <div
      className={clsx(
        'rounded-2xl',
        variants[variant],
        pad[padding],
        hoverable && 'transition-shadow duration-150 hover:shadow-card',
        clickable && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
