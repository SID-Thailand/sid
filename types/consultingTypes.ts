import type {
  iCTA,
  iImage,
  iMember,
  iLink,
  iMeta,
  iNumber,
  iQuiz,
} from './story'

export type iConsultingBody =
  | iConsultingHero
  | iConsultingExpertise
  | iConsultingDifference
  | iConsultingExperts
  | iConsultingService
  | iConsultingYoutube
  | iConsultingQuiz

export interface iConsultingContent {
  body: iConsultingBody[]
  component: string
  meta: iMeta[]
  cta: iCTA
}

export interface iService {
  asset: iImage
  component: string
  text: string
  description?: string
  _uid: string
}

export interface iYoutubeButton {
  component: string
  _uid: string
  label: string
  link: iLink
}

export interface iDifferenceGallery {
  asset: iImage
  background_asset: iImage
  component: string
  text: string
  title: string
  _uid: string
}

export interface iConsultingHero {
  component: string
  title: string
  _uid: string
  asset: iImage
}

export interface iConsultingExpertise {
  asset: iImage
  button_text: string
  component: string
  interview: iMember
  numbers: iNumber[]
  numbers_title: string
  title: string
  text: string
  _uid: string
}

export interface iConsultingDifference {
  component: string
  title: string
  _uid: string
  difference_gallery: iDifferenceGallery[]
}

export interface iConsultingExperts {
  component: string
  title: string
  subtitle: string
  _uid: string
  experts: iMember[]
}

export interface iConsultingService {
  component: string
  title: string
  subtitle: string
  _uid: string
  service: iService[]
}

export interface iConsultingYoutube {
  component: string
  title: string
  _uid: string
  asset: iImage
  subscribe_button: iYoutubeButton[]
}

export interface iConsultingQuiz {
  component: string
  _uid: string
  quiz: {
    content: iQuiz
  }
}
