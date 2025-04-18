import type { iCTA, iImage, iNewsCategory } from './story'

// export type iNewsBody =

export interface iCurrentNewsContent {
  // body: iNewsBody[]
  asset: iImage
  component: string
  cta: iCTA
  category: iNewsCategory
  form_title: string
  title: string
}
