import type { iCTA, iImage, iNewsCategory } from './story'

export interface iCurrentNewsContent {
  body: any[]
  asset: iImage
  component: string
  cta: iCTA
  category: iNewsCategory
  form_title: string
  title: string
}
