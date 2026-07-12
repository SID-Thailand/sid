type DataLayerParams = Record<string, unknown>

export const useDataLayerEvents = () => {
  const route = useRoute()
  const { selectedLang } = useLang()

  const pushDataLayerEvent = (event: string, params: DataLayerParams = {}) => {
    if (typeof window === 'undefined') return

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
