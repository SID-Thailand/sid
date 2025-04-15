import type {
  iCTA,
  iFeaturedProject,
  iImage,
  iInterview,
  iMember,
  iMeta,
  iNumber,
} from './story'

export type iAboutBody =
  | iAboutHistory
  | iAboutMission
  | iAboutTeam
  | iAboutHero
  | iAboutFeaturedProjects

export interface iAboutContent {
  body: iAboutBody[]
  component: string
  meta: iMeta[]
  cta: iCTA
}

export interface iHistoryItem {
  asset: iImage
  component: string
  description: string
  year: string
  _uid: string
}

export interface iTeamGroup {
  component: string
  group_name: string
  members: iMember
  _uid: string
}

export interface iAboutHero {
  asset: iImage
  component: string
  interview: iInterview
  text: string
  title: string
  numbers: iNumber[]
  _uid: string
}

export interface iAboutFeaturedProjects {
  title: string
  component: string
  text: string
  button_text: string
  featured_projects: iFeaturedProject[]
  _uid: string
}

export interface iAboutMission {
  component: string
  subtitle: string
  title: string
  assets: iImage[]
  _uid: string
}

export interface iAboutHistory {
  component: string
  text: string
  title: string
  items: iHistoryItem[]
  _uid: string
}

export interface iAboutTeam {
  component: string
  title: string
  team_groups: iTeamGroup[]
  _uid: string
}
