import { Gift } from 'lucide-react'
import { BuilderStep } from '../../types/models'

/**
 * Phone-frame mockup showing a simplified live preview of the gift website.
 * Each builder step renders a relevant screen.
 */
export default function GiftWebsitePreview({ present, activeStep }) {
  if (!present) return null

  return (
    <div className="w-full max-w-[220px]">
      {/* Phone frame */}
      <div className="rounded-[28px] bg-stone-800 p-2 shadow-lifted">
        {/* Screen */}
        <div className="rounded-[22px] overflow-hidden bg-[#FAF6F0] min-h-[400px] flex flex-col">
          {/* Notch */}
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-16 h-1.5 rounded-full bg-stone-700" />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <PreviewContent present={present} activeStep={activeStep} />
          </div>
        </div>
      </div>
    </div>
  )
}

function PreviewContent({ present, activeStep }) {
  switch (activeStep) {
    case BuilderStep.LANDING:
      return <LandingPreview present={present} />
    case BuilderStep.GIFTS:
      return <GiftsPreview present={present} />
    case BuilderStep.DETAILS:
      return <DetailsPreview present={present} />
    case BuilderStep.FINAL:
      return <FinalPreview present={present} />
    case BuilderStep.PUBLISH:
      return <PublishPreview present={present} />
    default:
      return <LandingPreview present={present} />
  }
}

function LandingPreview({ present }) {
  const lp = present.landingPage
  return (
    <div className="px-4 py-5 flex flex-col items-center text-center gap-3">
      <div className="w-12 h-12 rounded-full bg-[#C76B4F]/10 flex items-center justify-center">
        <Gift className="w-5 h-5 text-[#C76B4F]" />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-[#2A2520] leading-tight">
          {lp.heroTitle || 'Your title here'}
        </p>
        {lp.heroSubtitle && (
          <p className="text-[9px] text-[#8B7B6B] mt-0.5">{lp.heroSubtitle}</p>
        )}
      </div>
      {lp.heroMessage && (
        <p className="text-[8.5px] text-[#8B7B6B] leading-relaxed px-2 italic">
          "{lp.heroMessage.slice(0, 80)}{lp.heroMessage.length > 80 ? '…' : ''}"
        </p>
      )}
      <button className="mt-1 px-4 py-1.5 rounded-full bg-[#C76B4F] text-white text-[9px] font-semibold">
        See my gifts
      </button>
    </div>
  )
}

function GiftsPreview({ present }) {
  const gifts = present.giftOptions
  return (
    <div className="px-3 py-4">
      <p className="text-[9px] font-semibold text-[#8B7B6B] uppercase tracking-wider mb-2">Choose a gift</p>
      {gifts.length === 0 ? (
        <div className="border border-dashed border-[#D4C4B0] rounded-xl p-3 text-center">
          <p className="text-[8px] text-[#B8A492]">Gift options will appear here</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {gifts.slice(0, 3).map((g) => (
            <div key={g.id} className="rounded-xl bg-white border border-[#E8DDD0] p-2.5">
              <p className="text-[9px] font-semibold text-[#2A2520]">{g.title}</p>
              {g.priceRange && (
                <p className="text-[8px] text-[#8B7B6B] mt-0.5">{g.priceRange}</p>
              )}
            </div>
          ))}
          {gifts.length > 3 && (
            <p className="text-[8px] text-[#B8A492] text-center">+{gifts.length - 3} more</p>
          )}
        </div>
      )}
    </div>
  )
}

function DetailsPreview({ present }) {
  const gift = present.giftOptions[0]
  return (
    <div className="px-3 py-4">
      {gift ? (
        <>
          <div className="w-full h-16 rounded-xl bg-[#EDE0CC] mb-3 flex items-center justify-center">
            <Gift className="w-5 h-5 text-[#B8A492]" />
          </div>
          <p className="text-[10px] font-semibold text-[#2A2520] mb-1">{gift.title}</p>
          {gift.detailSections[0] && (
            <p className="text-[8px] text-[#8B7B6B] leading-relaxed">
              {gift.detailSections[0].content.slice(0, 90)}…
            </p>
          )}
          <button className="mt-3 w-full py-1.5 rounded-full bg-[#C76B4F] text-white text-[9px] font-semibold">
            Choose this one
          </button>
        </>
      ) : (
        <div className="border border-dashed border-[#D4C4B0] rounded-xl p-3 text-center">
          <p className="text-[8px] text-[#B8A492]">Add gift options first</p>
        </div>
      )}
    </div>
  )
}

function FinalPreview({ present }) {
  const fs = present.finalScreen
  return (
    <div className="px-4 py-6 flex flex-col items-center text-center gap-2">
      <div className="w-10 h-10 rounded-full bg-[#C76B4F]/10 flex items-center justify-center mb-1">
        <span className="text-base">🎁</span>
      </div>
      <p className="text-[10px] font-semibold text-[#2A2520] leading-tight">
        {fs.title || 'Final message'}
      </p>
      {fs.message && (
        <p className="text-[8px] text-[#8B7B6B] leading-relaxed italic">
          "{fs.message.slice(0, 70)}{fs.message.length > 70 ? '…' : ''}"
        </p>
      )}
      <button className="mt-2 px-4 py-1.5 rounded-full bg-[#C76B4F] text-white text-[9px] font-semibold">
        {fs.ctaLabel || 'Send my choice'}
      </button>
    </div>
  )
}

function PublishPreview({ present }) {
  const ps = present.publishSettings
  return (
    <div className="px-3 py-4 flex flex-col items-center text-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        ps.isPublished ? 'bg-green-100' : 'bg-[#EDE0CC]'
      }`}>
        <span className="text-base">{ps.isPublished ? '🌍' : '🔒'}</span>
      </div>
      <p className="text-[10px] font-semibold text-[#2A2520]">
        {ps.isPublished ? 'Live!' : 'Not published yet'}
      </p>
      {ps.slug && (
        <div className="w-full bg-white border border-[#E8DDD0] rounded-lg px-2 py-1.5">
          <p className="text-[8px] text-[#8B7B6B] truncate">{window.location.hostname}/{ps.slug}</p>
        </div>
      )}
    </div>
  )
}
