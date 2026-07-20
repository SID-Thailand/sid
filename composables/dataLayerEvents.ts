type DataLayerParams = Record<string, unknown>

declare global {
  interface Window {
    __sidTrackedFormStarts?: Set<string>
  }
}

export const useDataLayerEvents = () => {
  const route = useRoute()
  const { selectedLang } = useLang()

  const pushDataLayerEvent = (event: string, params: DataLayerParams = {}) => {
    if (typeof window === 'undefined') return

    if (event === 'form_start') {
      const trackedForms = (window.__sidTrackedFormStarts ||= new Set<string>())
      // A route can render the same lead form in multiple surfaces. Keep a
      // single visit-level form_start signal for each page view.
      const formKey = route.fullPath

      if (trackedForms.has(formKey)) return
      trackedForms.add(formKey)
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
