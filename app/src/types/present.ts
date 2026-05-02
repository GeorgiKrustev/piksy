export type PageType = 'landing' | 'gifts' | 'gift-detail' | 'final' | 'custom'

interface BasePage {
  id: string
  type: PageType
  order: number
}

export interface LandingPage extends BasePage {
  type: 'landing'
  title: string
  subtitle: string
  coverImage?: string
  buttonLabel: string
}

export interface Gift {
  id: string
  title: string
  description: string
  image?: string
  price?: string
  link?: string
}

export interface GiftsPage extends BasePage {
  type: 'gifts'
  title: string
  gifts: Gift[]
}

export interface GiftDetailPage extends BasePage {
  type: 'gift-detail'
  giftId: string
}

export interface FinalPage extends BasePage {
  type: 'final'
  title: string
  message: string
  image?: string
}

export type Page = LandingPage | GiftsPage | GiftDetailPage | FinalPage

export interface Present {
  id: string
  slug: string
  title: string
  published: boolean
  publishedAt?: string
  pages: Page[]
  createdAt: string
  updatedAt: string
}
