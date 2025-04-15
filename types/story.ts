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

export interface iCompanyDirection {
  description: string
  person: iMember
  component: string
  title: string
  _uid: string
}

export interface iCompanyDirections {
  title: string
  directions: iCompanyDirection[]
  component: string
  _uid: string
}

export interface iFeaturedProject {
  name: string
  slug: string
  full_slug: string
  _uid: string
  content: {
    component: string
    cover: iImage
    name: string
    spec_1: string
    spec_2: string
    spec_3: string
  }
}

export interface iFeaturedProjects {
  title: string
  component: string
  text: string
  button_text: string
  featured_projects: iFeaturedProject[]
  _uid: string
}

export interface iNumber {
  component: string
  number: string
  text: string
  _uid: string
}

export interface iInterview {
  content: {
    component: string
    interview: iImage
    interview_position: string
    interview_title: string
    links: iLink[]
    masked_photo: iImage
    name: string
    photo: iImage
    position: string
    _uid: string
  }
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
  form_title: string
  _uid: string
}

export interface iMember {
  content: {
    component: string
    masked_photo: iImage
    photo: iImage
    name: string
    position: string
    interview?: iImage
    interview_title?: string
    interview_position?: string
    links: { label: string; component: string; link: iLink }[]
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

export interface iFooterContent {
  button: string
  component: string
  email_label: string
  newsletter_title: string
  contacts: iContacts
}

export interface iFormContent {
  component: string
  email_label: string
  full_name_label: string
  phone_label: string
  thankyou_text: string
}
