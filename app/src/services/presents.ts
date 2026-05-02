import { supabase } from '../lib/supabase'
import type { Present, Page, LandingPage, GiftsPage, GiftDetailPage, FinalPage } from '../types/present'
// @ts-ignore — existing JS service, no types yet
import { presentService } from './presentService'

// ---------------------------------------------------------------------------
// Row shape from Supabase (snake_case → camelCase)
// ---------------------------------------------------------------------------

interface PresentRow {
  id: string
  slug: string
  title: string
  published: boolean
  published_at: string | null
  pages: Page[]
  created_at: string
  updated_at: string
}

function fromRow(row: PresentRow): Present {
  return {
    id:          row.id,
    slug:        row.slug,
    title:       row.title,
    published:   row.published,
    publishedAt: row.published_at ?? undefined,
    pages:       row.pages,
    createdAt:   row.created_at,
    updatedAt:   row.updated_at,
  }
}

// ---------------------------------------------------------------------------
// Transform: localStorage present model → pages[]
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildPages(localPresent: any): Page[] {
  const pages: Page[] = []
  let order = 0

  // Landing
  const lp = localPresent.landingPage
  const landing: LandingPage = {
    id:          'page_landing_' + localPresent.id,
    type:        'landing',
    order:       order++,
    title:       lp.heroTitle       ?? '',
    subtitle:    lp.heroSubtitle    ?? '',
    coverImage:  lp.heroImageUrl    ?? undefined,
    buttonLabel: 'See my gifts',
  }
  pages.push(landing)

  // Gifts list
  const gifts = (localPresent.giftOptions ?? []).map((g: any) => ({
    id:          g.id,
    title:       g.title,
    description: g.description,
    image:       g.imageUrl ?? undefined,
    price:       g.priceRange || undefined,
    link:        undefined,
  }))

  const giftsPage: GiftsPage = {
    id:     'page_gifts_' + localPresent.id,
    type:   'gifts',
    order:  order++,
    title:  'Choose your gift',
    gifts,
  }
  pages.push(giftsPage)

  // One detail page per gift
  for (const gift of localPresent.giftOptions ?? []) {
    const detail: GiftDetailPage = {
      id:     'page_detail_' + gift.id,
      type:   'gift-detail',
      order:  order++,
      giftId: gift.id,
    }
    pages.push(detail)
  }

  // Final
  const fs = localPresent.finalScreen
  const final: FinalPage = {
    id:      'page_final_' + localPresent.id,
    type:    'final',
    order:   order++,
    title:   fs.title   ?? '',
    message: fs.message ?? '',
  }
  pages.push(final)

  return pages
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

export const presents = {
  async getBySlug(slug: string): Promise<Present | null> {
    const { data, error } = await supabase
      .from('presents')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !data) return null
    return fromRow(data as PresentRow)
  },

  async getById(id: string): Promise<Present | null> {
    const { data, error } = await supabase
      .from('presents')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null
    return fromRow(data as PresentRow)
  },

  async upsert(present: Partial<Present> & { slug: string; title: string }): Promise<Present> {
    const row = {
      ...(present.id ? { id: present.id } : {}),
      slug:         present.slug,
      title:        present.title,
      published:    present.published    ?? false,
      published_at: present.publishedAt  ?? null,
      pages:        present.pages        ?? [],
      updated_at:   new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('presents')
      .upsert(row, { onConflict: 'slug' })
      .select()
      .single()

    if (error || !data) throw new Error(error?.message ?? 'Upsert failed')
    return fromRow(data as PresentRow)
  },

  async checkSlugAvailable(slug: string, excludeId?: string): Promise<boolean> {
    let query = supabase
      .from('presents')
      .select('id')
      .eq('slug', slug)

    const { data } = await query
    if (!data || data.length === 0) return true
    if (excludeId && data.length === 1 && data[0].id === excludeId) return true
    return false
  },

  async publish(localId: string, slug: string): Promise<Present> {
    const localPresent = presentService.getById(localId)
    if (!localPresent) throw new Error(`Present ${localId} not found in local storage`)

    const pages = buildPages(localPresent)

    return this.upsert({
      slug,
      title:       localPresent.title,
      published:   true,
      publishedAt: new Date().toISOString(),
      pages,
    })
  },

  async unpublish(localId: string): Promise<Present | null> {
    const localPresent = presentService.getById(localId)
    if (!localPresent) return null

    const slug = localPresent.publishSettings?.slug
    if (!slug) return null

    const { data, error } = await supabase
      .from('presents')
      .update({ published: false, updated_at: new Date().toISOString() })
      .eq('slug', slug)
      .select()
      .single()

    if (error || !data) return null
    return fromRow(data as PresentRow)
  },
}
