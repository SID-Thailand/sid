export const WEBSITE_EVENTS = [
  'page_view',
  'form_start',
  'generate_lead',
  'click_whatsapp',
  'click_phone',
  'click_email',
] as const

export type WebsiteEvent = (typeof WEBSITE_EVENTS)[number]

export const getContactClickEvent = (
  href: string
): Extract<WebsiteEvent, `click_${string}`> | undefined => {
  const normalized = href.trim().toLowerCase()

  if (normalized.startsWith('tel:')) return 'click_phone'
  if (normalized.startsWith('mailto:')) return 'click_email'
  if (
    normalized.includes('wa.me/') ||
    normalized.includes('whatsapp.com/') ||
    normalized.startsWith('whatsapp:')
  ) {
    return 'click_whatsapp'
  }
}
