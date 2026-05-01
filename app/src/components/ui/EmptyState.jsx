import { clsx } from 'clsx'
import { Button } from './Button'

/**
 * @param {{
 *   icon?: React.ReactNode
 *   title: string
 *   description?: string
 *   action?: { label: string, onClick: () => void }
 *   className?: string
 * }} props
 */
export function EmptyState({ icon, title, description, action, className }) {
  return (
    <div className={clsx('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-cream-200 flex items-center justify-center text-stone-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-stone-700 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-stone-400 max-w-xs leading-relaxed">{description}</p>
      )}
      {action && (
        <div className="mt-5">
          <Button variant="secondary" size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  )
}
