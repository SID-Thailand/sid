const getContactClickEvent = (href: string) => {
  const normalized = href.toLowerCase()

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

export const useContactClickTracking = () => {
  const { pushDataLayerEvent } = useDataLayerEvents()

  onMounted(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest<HTMLAnchorElement>('a[href]')
      if (!link) return

      const clickEvent = getContactClickEvent(link.href)
      if (!clickEvent) return

      pushDataLayerEvent(clickEvent, {
        click_url: link.href,
        click_text: link.textContent?.trim().replace(/\s+/g, ' ') || '',
      })
    }

    // Capture the interaction before tel:/mailto: handlers hand control to the browser.
    document.addEventListener('pointerdown', onClick, true)

    onBeforeUnmount(() => {
      document.removeEventListener('pointerdown', onClick, true)
    })
  })
}
