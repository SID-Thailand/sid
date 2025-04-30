import type { iCTA, iImage, iLink, iMeta } from './story'

export interface iContactItem {
  component: string
  title: string
  item: { component: string; label: string; link: iLink }[]
}

export interface iContact {
  content: {
    asset: iImage
    component: string
    title: string
    items: iContactItem[]
  }
}

export interface iContactContent {
  component: string
  meta: iMeta[]
  cta: iCTA
  title: string
  contacts: iContact[]
  form_bg: iImage
  form_text: string
  form_title: string
}
