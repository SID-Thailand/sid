import type { iCTA, iImage, iMeta, iProjectCategory } from './story'

export interface iNewsContent {
  cta: iCTA
  category: iProjectCategory
}

export interface iNewsHeroContent {
  title: string
  categories_all: string
  hero_text: string
  component: string
  meta: iMeta[]
  cta: iCTA
  background: iImage
}
