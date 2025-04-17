import type { iCTA, iImage, iMeta, iProjectCategory } from './story'

export interface iProjectsContent {
  category: iProjectCategory
  component: string
  cover: iImage
  cta: iCTA
  name: string
  spec_1: string
  spec_2: string
  spec_3: string
}

export interface iProjectsHeroContent {
  title: string
  categories_all: string
  description: string
  component: string
  meta: iMeta[]
  cta: iCTA
}
