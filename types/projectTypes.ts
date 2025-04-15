import type { iCTA, iFeaturedProject, iImage, iLink } from './story'

export interface iProjectCategory {
  component: string
  name: string
}

export interface iPlan {
  component: string
  label: string
  link: iLink
  _uid: string
}

export interface iSlider {
  asset: iImage
  component: string
  description: string
  title: string
}

export interface iApartment {
  area: string
  component: string
  info: string
  name: string
  price: string
  sold_out: boolean
  assets: iImage[]
  plan: iPlan[]
  _uid: string
}

export interface iProjectGallery {
  component: string
  images: iImage[]
  _uid: string
}

export interface iProjectConcept {
  big_asset: iImage
  big_asset_description: string
  component: string
  small_asset: iImage
  small_asset_description: string
  subtitle: string
  text: string
  title: string
  _uid: string
}

export interface iProjectInterior {
  component: string
  apartments: iApartment[]
  text: string
  title: string
  asset: iImage
  _uid: string
}

export interface iProjectForm {
  component: string
  asset: iImage
  button_text: string
  email_label: string
  full_name_label: string
  phone_label: string
  text: string
  title: string
  _uid: string
}

export interface iProjectFeaturedProjects {
  component: string
  backdrop_asset: iImage
  button_text: string
  text: string
  title: string
  featured_projects: iFeaturedProject[]
  _uid: string
}

export interface iProjectAbout {
  component: string
  content: {
    type: string
    content: {
      type: string
      content: {
        text?: string
        attrs?: { alt: string; src: string; title: string; id: number }
        type: 'text' | 'image'
      }[]
    }[]
  }
  _uid: string
}

export interface iProjectFacilities {
  component: string
  slider: iSlider[]
  subtitle: string
  title: string
  _uid: string
}

export interface iProjectExterior {
  component: string
  assets: iImage[]
  text: string
  title: string
  _uid: string
}

export type iProjectBody =
  | iProjectConcept
  | iProjectAbout
  | iProjectGallery
  | iProjectFacilities
  | iProjectExterior
  | iProjectInterior
  | iProjectForm
  | iProjectFeaturedProjects

export interface iProjectContent {
  body: iProjectBody[]
  category: iProjectCategory
  component: string
  cover: iImage
  cta: iCTA
  name: string
  spec_1: string
  spec_2: string
  spec_3: string
}
