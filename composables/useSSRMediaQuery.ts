// composables/useSSRMediaQuery.ts
import { useRequestHeaders } from 'nuxt/app'
import { useMediaQuery } from '@vueuse/core'
import { UAParser } from 'ua-parser-js'

export function useSSRMediaQuery(query: string) {
  const isMatch = useState('isSSRMatch', () => false)

  // Server-side detection using UA
  if (import.meta.server) {
    const headers = useRequestHeaders(['user-agent'])
    const ua = headers['user-agent'] || ''
    const parser = new UAParser(ua)
    const deviceType = parser.getDevice().type || 'desktop'

    // Assign typical screen width based on device type
    let assumedWidth = 1024 // default desktop

    if (deviceType === 'mobile') assumedWidth = 375
    else if (deviceType === 'tablet') assumedWidth = 768
    else if (deviceType === 'smarttv') assumedWidth = 1920

    // Parse query
    if (query.includes('max-width')) {
      const max = parseInt(query.match(/max-width:\s*(\d+)px/)?.[1] || '0')
      isMatch.value = assumedWidth <= max
    } else if (query.includes('min-width')) {
      const min = parseInt(query.match(/min-width:\s*(\d+)px/)?.[1] || '0')
      isMatch.value = assumedWidth >= min
    }
  }

  // Client-side hydration using VueUse
  if (import.meta.client) {
    const clientMatch = useMediaQuery(query)

    onMounted(() => {
      if (isMatch.value !== clientMatch.value) {
        isMatch.value = clientMatch.value
      }
    })

    watch(clientMatch, val => {
      isMatch.value = val
    })
  }

  return computed(() => isMatch.value)
}
