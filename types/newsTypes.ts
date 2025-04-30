import type { iCTA, iImage, iMeta, iNewsCategory } from './story'

export interface iNewsContent {
  asset: iImage
  component: string
  cta: iCTA
  form_title: string
  form_bg: iImage
  title: string
  category: iNewsCategory
  // BODY NEED TO BE UPDATE
  body: string
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
