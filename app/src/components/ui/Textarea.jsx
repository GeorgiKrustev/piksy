import { useId } from 'react'
import { clsx } from 'clsx'

/**
 * @param {{
 *   label?: string
 *   helperText?: string
 *   error?: string
 *   required?: boolean
 *   rows?: number
 *   className?: string
 * } & React.TextareaHTMLAttributes<HTMLTextAreaElement>} props
 */
export function Textarea({ label, helperText, error, required, rows = 4, className, id: idProp, ...props }) {
  const autoId = useId()
  const id     = idProp ?? autoId

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-stone-700 select-none">
          {label}
          {required && <span className="text-terracotta-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        required={required}
        className={clsx(
          'w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-stone-800 resize-none',
          'placeholder:text-stone-300 transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-terracotta-400/30 focus:border-terracotta-400',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-cream-100',
          error
            ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
            : 'border-stone-200 hover:border-stone-300',
          className
        )}
        {...props}
      />
      {(error || helperText) && (
        <p className={clsx('text-xs', error ? 'text-red-500' : 'text-stone-400')}>
          {error ?? helperText}
        </p>
      )}
    </div>
  )
}
