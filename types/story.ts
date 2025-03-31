export interface iMeta {
  title: string
  description?: string
  image?: {
    _uid: string
    filename: string
  }
}

export interface iStory<T = any> {
  content: T
  slug: string
  created_at: string
  first_published_at: string
  published_at: number
  name: string
  _uid: string
  uuid: string
  id: number
  title?: string
  meta?: iMeta[]
}

export interface iImage {
  _uid: string
  filename: string
  name?: string
  alt?: string
}

export interface iHomeHero {
  address: string
  title: string
  asset: iImage
  component: string
}

export interface iHomeAbout {
  address: string
  button_text: string
  text: string
  title: string
  gallery: iImage[]
  component: string
}

interface iHomeCompanyDirection {
  description: string
  person_asset: iImage
  person_description: string
  person_title: string
  title: string
}

export interface iHomeCompanyDirections {
  title: string
  directions: iHomeCompanyDirection[]
  component: string
}

interface iHomeNumber {
  asset: iImage
  description: string
  value: string
}

export interface iHomeNumbers {
  address: string
  button_text: string
  numbers: iHomeNumber[]
  title: string
  component: string
}

export interface iHomeVideo {
  address: string
  asset: iImage
  title: string
  component: string
}

export interface iHomeBody {
  about: iHomeAbout
  hero: iHomeHero
  company_directions: iHomeCompanyDirections
  numbers: iHomeNumbers
  video: iHomeVideo
}

export interface iHomeContent {
  body: iHomeBody[]
  meta: iMeta[]
  scroll_down_text: string
}
