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

export interface iLink {
  id: string
  fieldtype: string
  linktype: string
  cached_url: string
  url: string
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
  person: iMember
  component: string
  title: string
  // person_asset: iImage
  // person_description: string
  // person_title: string
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

interface iFeaturedProject {
  name: string
  slug: string
  full_slug: string
  content: {
    component: string
    cover: iImage
    name: string
    small_description: string
    spec_1: string
    spec_2: string
    spec_3: string
  }
}

export interface iHomeFeaturedProjects {
  title: string
  component: string
  text: string
  button_text: string
  backdrop_asset: iImage
  featured_projects: iFeaturedProject[]
}

export interface iQuizStepItem {
  asset: iImage
  component: string
  label: string
}

export interface iQuizStep {
  title: string
  component: string
  items?: iQuizStepItem[]
}

export interface iQuiz {
  back_button: string
  component: string
  next_button: string
  send_button: string
  title: string
  steps: iQuizStep[]
}

export interface iHomeQuiz {
  component: string
  quiz: {
    content: iQuiz
  }
}

export interface iHomeBody {
  about: iHomeAbout
  hero: iHomeHero
  company_directions: iHomeCompanyDirections
  numbers: iHomeNumbers
  video: iHomeVideo
  featured_projects: iHomeFeaturedProjects
  quiz_block: iHomeQuiz
}

export interface iMember {
  content: {
    component: string
    masked_photo: iImage
    photo: iImage
    name: string
    position: string
    interview_title?: string
    interview_position?: string
    links: { labek: string; component: string; link: iLink }[]
  }
}

export interface iCTA {
  content: {
    backdrop_asset: iImage
    button_text: string
    component: string
    title: string
    manager: iMember
    link: iLink
  }
}

export interface iContactItem {
  component: string
  label: string
  link: iLink
}

export interface iContact {
  title: string
  component: string
  item: iContactItem[]
}

export interface iContacts {
  content: {
    asset: iImage
    component: string
    title: string
    items: iContact[]
  }
}

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

export interface iHomeContent {
  body: iHomeBody[]
  meta: iMeta[]
  cta: iCTA
  scroll_down_text: string
}

export interface iFooterContent {
  button: string
  component: string
  email_label: string
  newsletter_title: string
  contacts: iContacts
}

export interface iMenuContent {
  component: string
  menu_button_text: string
  links: iMenuLink[]
  socials: iMenuSocial[]
}

export interface iFormContent {
  component: string
  email_label: string
  full_name_label: string
  phone_label: string
  thankyou_text: string
}
