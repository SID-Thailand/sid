import type { iImage, iLink } from './story'

export interface iMenuLink {
  asset: iImage
  component: string
  label: string
  link: iLink
}

export interface iMenuSocial {
  component: string
  label: string
  link: iLink
}

export interface iMenuContent {
  component: string
  menu_button_text: string
  links: iMenuLink[]
  socials: iMenuSocial[]
}
