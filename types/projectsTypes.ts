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
  description: string
}

export interface iProjectsHeroContent {
  title: string
  categories_all: string
  description: string
  component: string
  meta: iMeta[]
  cta: iCTA
  view_project_btn: string
  background: iImage
  project_template_spec_1: string
  project_template_spec_2: string
  project_template_spec_3: string
  project_interior_menu_text: string
}
