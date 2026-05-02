import { Gift as GiftIcon } from 'lucide-react'
import type { Gift } from '../../types/present'

interface Props {
  gift: Gift
  onChoose: () => void
}

export default function GiftDetailView({ gift, onChoose }: Props) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero image or placeholder */}
      {gift.image ? (
        <img
          src={gift.image}
          alt={gift.title}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-[#EDE0CC] flex items-center justify-center">
          <GiftIcon className="w-12 h-12 text-[#B8A492]" />
        </div>
      )}

      <div className="flex flex-col gap-4 px-5 py-6">
        <h2 className="text-2xl font-semibold text-[#2A2520]">{gift.title}</h2>

        {gift.price && (
          <p className="text-base font-medium text-[#C76B4F]">{gift.price}</p>
        )}

        {gift.description && (
          <p className="text-base text-[#5A4A3A] leading-relaxed">{gift.description}</p>
        )}

        {gift.link && (
          <a
            href={gift.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#C76B4F] underline underline-offset-2"
          >
            Learn more
          </a>
        )}
      </div>

      <div className="mt-auto px-5 pb-8">
        <button
          onClick={onChoose}
          className="w-full py-3.5 rounded-full bg-[#C76B4F] text-white text-base font-semibold hover:bg-[#b55e43] active:scale-[0.98] transition-all"
        >
          Choose this one
        </button>
      </div>
    </div>
  )
}
