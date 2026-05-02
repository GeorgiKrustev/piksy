import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { presents as presentsService } from '../services/presents'
import type { Present, Page, LandingPage, GiftsPage, GiftDetailPage, FinalPage, Gift } from '../types/present'
import ViewerShell    from '../components/viewer/ViewerShell'
import BackButton     from '../components/viewer/BackButton'
import LandingView    from '../components/viewer/LandingView'
import GiftsView      from '../components/viewer/GiftsView'
import GiftDetailView from '../components/viewer/GiftDetailView'
import FinalView      from '../components/viewer/FinalView'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sortedPages(pages: Page[]): Page[] {
  return [...pages].sort((a, b) => a.order - b.order)
}

function findGiftsPage(pages: Page[]): GiftsPage | undefined {
  return pages.find((p): p is GiftsPage => p.type === 'gifts')
}

function findDetailPage(pages: Page[], giftId: string): GiftDetailPage | undefined {
  return pages.find((p): p is GiftDetailPage => p.type === 'gift-detail' && p.giftId === giftId)
}

function findFinalPage(pages: Page[]): FinalPage | undefined {
  return pages.find((p): p is FinalPage => p.type === 'final')
}

// ---------------------------------------------------------------------------
// Loading / Not found states
// ---------------------------------------------------------------------------

function LoadingScreen() {
  return (
    <ViewerShell>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#C76B4F]/30 border-t-[#C76B4F] animate-spin" />
      </div>
    </ViewerShell>
  )
}

function NotFoundScreen() {
  return (
    <ViewerShell>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
        <div className="w-16 h-16 rounded-full bg-[#EDE0CC] flex items-center justify-center text-3xl">
          🎁
        </div>
        <h1 className="text-xl font-semibold text-[#2A2520]">Present not found</h1>
        <p className="text-sm text-[#8B7B6B]">
          This link may have expired or the present hasn't been published yet.
        </p>
      </div>
    </ViewerShell>
  )
}

// ---------------------------------------------------------------------------
// Main viewer
// ---------------------------------------------------------------------------

export default function PresentViewer() {
  const { slug } = useParams<{ slug: string }>()

  const [present,  setPresent]  = useState<Present | null>(null)
  const [loading,  setLoading]  = useState(true)
  const [navStack, setNavStack] = useState<string[]>([])

  useEffect(() => {
    if (!slug) { setLoading(false); return }

    presentsService.getBySlug(slug).then((data) => {
      setPresent(data)
      if (data) {
        const first = sortedPages(data.pages)[0]
        if (first) setNavStack([first.id])
      }
      setLoading(false)
    })
  }, [slug])

  if (loading)           return <LoadingScreen />
  if (!present)          return <NotFoundScreen />

  const pages   = sortedPages(present.pages)
  const current = pages.find((p) => p.id === navStack[navStack.length - 1])
  if (!current)          return <NotFoundScreen />

  const canGoBack = navStack.length > 1

  function push(pageId: string) {
    setNavStack((s) => [...s, pageId])
  }

  function pop() {
    setNavStack((s) => (s.length > 1 ? s.slice(0, -1) : s))
  }

  function handleLandingCta() {
    const giftsPage = findGiftsPage(pages)
    if (giftsPage) push(giftsPage.id)
  }

  function handleSelectGift(gift: Gift) {
    const detailPage = findDetailPage(pages, gift.id)
    if (detailPage) push(detailPage.id)
  }

  function handleChooseGift() {
    const finalPage = findFinalPage(pages)
    if (finalPage) push(finalPage.id)
  }

  function renderPage() {
    switch (current!.type) {
      case 'landing':
        return (
          <LandingView
            page={current as LandingPage}
            onCta={handleLandingCta}
          />
        )

      case 'gifts': {
        return (
          <GiftsView
            page={current as GiftsPage}
            onSelectGift={handleSelectGift}
          />
        )
      }

      case 'gift-detail': {
        const detailPage = current as GiftDetailPage
        const giftsPage  = findGiftsPage(pages)
        const gift       = giftsPage?.gifts.find((g) => g.id === detailPage.giftId)
        if (!gift) return null
        return (
          <GiftDetailView
            gift={gift}
            onChoose={handleChooseGift}
          />
        )
      }

      case 'final':
        return <FinalView page={current as FinalPage} />

      default:
        return null
    }
  }

  return (
    <ViewerShell>
      {/* Back button */}
      {canGoBack && (
        <div className="px-4 pt-4">
          <BackButton onBack={pop} />
        </div>
      )}

      {/* Page content */}
      <div className="flex flex-col flex-1">
        {renderPage()}
      </div>
    </ViewerShell>
  )
}
