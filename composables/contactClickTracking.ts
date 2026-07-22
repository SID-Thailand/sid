import { getContactClickEvent } from '~/utils/analyticsEvents'

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

    document.addEventListener('click', onClick, true)

    onBeforeUnmount(() => {
      document.removeEventListener('click', onClick, true)
    })
  })
}
