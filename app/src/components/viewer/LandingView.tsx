import { Gift } from 'lucide-react'
import type { LandingPage } from '../../types/present'

interface Props {
  page: LandingPage
  onCta: () => void
}

export default function LandingView({ page, onCta }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-16 gap-6">
      {page.coverImage ? (
        <img
          src={page.coverImage}
          alt=""
          className="w-full h-48 object-cover rounded-2xl"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-[#C76B4F]/10 flex items-center justify-center">
          <Gift className="w-9 h-9 text-[#C76B4F]" />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-[#2A2520] leading-snug">
          {page.title}
        </h1>
        {page.subtitle && (
          <p className="text-base text-[#8B7B6B]">{page.subtitle}</p>
        )}
      </div>

      <button
        onClick={onCta}
        className="mt-2 px-8 py-3 rounded-full bg-[#C76B4F] text-white text-base font-semibold hover:bg-[#b55e43] active:scale-95 transition-all"
      >
        {page.buttonLabel || 'See my gifts'}
      </button>
    </div>
  )
}
