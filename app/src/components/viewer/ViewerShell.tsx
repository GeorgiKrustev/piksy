import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

/**
 * Outer wrapper for the present viewer.
 * Mobile-first, centered on desktop, no app chrome.
 */
export default function ViewerShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col items-center">
      <div className="w-full max-w-[430px] min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  )
}
