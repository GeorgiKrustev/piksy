import type { GiftsPage, Gift } from '../../types/present'

interface Props {
  page: GiftsPage
  onSelectGift: (gift: Gift) => void
}

export default function GiftsView({ page, onSelectGift }: Props) {
  return (
    <div className="flex-1 flex flex-col px-5 py-8 gap-5">
      <h2 className="text-xl font-semibold text-[#2A2520]">{page.title}</h2>

      <div className="flex flex-col gap-3">
        {page.gifts.map((gift) => (
          <button
            key={gift.id}
            onClick={() => onSelectGift(gift)}
            className="w-full text-left bg-white border border-[#E8DDD0] rounded-2xl p-4 hover:border-[#C76B4F]/40 hover:shadow-sm active:scale-[0.99] transition-all"
          >
            {gift.image && (
              <img
                src={gift.image}
                alt={gift.title}
                className="w-full h-32 object-cover rounded-xl mb-3"
              />
            )}
            <p className="text-base font-semibold text-[#2A2520]">{gift.title}</p>
            {gift.description && (
              <p className="text-sm text-[#8B7B6B] mt-1 leading-relaxed">{gift.description}</p>
            )}
            {gift.price && (
              <p className="text-sm font-medium text-[#C76B4F] mt-2">{gift.price}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
