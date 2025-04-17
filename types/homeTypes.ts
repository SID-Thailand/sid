import type { iCTA, iImage, iMeta, iQuiz } from './story'

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

export interface iHomeNumber {
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
  | iHomeNumbers
  | iHomeVideo
  | iHomeQuiz

export interface iHomeContent {
  body: iHomeBody[]
  meta: iMeta[]
  cta: iCTA
  scroll_down_text: string
}
