import type {
  iCTA,
  iFeaturedProject,
  iImage,
  iMember,
  iMeta,
  iQuiz,
} from './story'

export interface iHomeHero {
  address: string
  title: string
  asset: iImage
  component: string
  _uid: string
}

export interface iHomeAbout {
  address: string
  button_text: string
  text: string
  title: string
  gallery: iImage[]
  component: string
  _uid: string
}

interface iHomeCompanyDirection {
  description: string
  person: iMember
  component: string
  title: string
  _uid: string
  // person_asset: iImage
  // person_description: string
  // person_title: string
}

export interface iHomeCompanyDirections {
  title: string
  directions: iHomeCompanyDirection[]
  component: string
  _uid: string
}

interface iHomeNumber {
  asset: iImage
  description: string
  value: string
  _uid: string
}

export interface iHomeNumbers {
  address: string
  button_text: string
  numbers: iHomeNumber[]
  title: string
  component: string
  _uid: string
}

export interface iHomeVideo {
  address: string
  asset: iImage
  title: string
  component: string
  _uid: string
}

export interface iHomeFeaturedProjects {
  title: string
  component: string
  text: string
  button_text: string
  featured_projects: iFeaturedProject[]
  _uid: string
}

export interface iHomeQuiz {
  component: string
  _uid: string
  quiz: {
    content: iQuiz
  }
}

export type iHomeBody =
  | iHomeAbout
  | iHomeHero
  | iHomeCompanyDirections
  | iHomeNumbers
  | iHomeVideo
  | iHomeFeaturedProjects
  | iHomeQuiz

export interface iHomeContent {
  body: iHomeBody[]
  meta: iMeta[]
  cta: iCTA
  scroll_down_text: string
}
