import type { WebsiteEvent } from '~/utils/analyticsEvents'

type DataLayerParams = Record<string, unknown>

declare global {
  interface Window {
    __sidFormStartTracked?: boolean
  }
}

export const useDataLayerEvents = () => {
  const route = useRoute()
  const { selectedLang } = useLang()

  const pushDataLayerEvent = (
    event: WebsiteEvent,
    params: DataLayerParams = {}
  ) => {
    if (typeof window === 'undefined') return

    if (event === 'page_view') {
      window.__sidFormStartTracked = false
    }

    if (event === 'form_start') {
      if (window.__sidFormStartTracked) return
      window.__sidFormStartTracked = true
    }

    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event,
      page_path: route.path,
      page_location: window.location.href,
      page_language: selectedLang.value || '-',
      ...params,
    })
  }

  return { pushDataLayerEvent }
}

export const usePageViewTracking = () => {
  const route = useRoute()
  const router = useRouter()
  const { pushDataLayerEvent } = useDataLayerEvents()
  let removeAfterEach: (() => void) | undefined
  let lastFullPath = ''

  const trackPageView = async () => {
    await nextTick()
    if (route.fullPath === lastFullPath) return

    lastFullPath = route.fullPath
    pushDataLayerEvent('page_view', {
      page_title: document.title,
    })
  }

  onMounted(() => {
    void trackPageView()
    removeAfterEach = router.afterEach(() => {
      void trackPageView()
    })
  })

  onBeforeUnmount(() => removeAfterEach?.())
}
