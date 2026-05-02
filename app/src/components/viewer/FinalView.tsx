import type { FinalPage } from '../../types/present'

interface Props {
  page: FinalPage
}

export default function FinalView({ page }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-16 gap-6">
      {page.image ? (
        <img
          src={page.image}
          alt=""
          className="w-28 h-28 rounded-full object-cover"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-[#C76B4F]/10 flex items-center justify-center text-4xl">
          🎁
        </div>
      )}

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-[#2A2520] leading-snug">{page.title}</h2>
        {page.message && (
          <p className="text-base text-[#8B7B6B] leading-relaxed">{page.message}</p>
        )}
      </div>
    </div>
  )
}
