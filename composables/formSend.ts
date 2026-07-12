import { delayPromise } from '@emotionagency/utils'
import type { iInputData } from '~/types/headless/input'
import { captureTrafficSource } from '~/utils/trafficSource'

export interface IData {
  [key: string]: Omit<iInputData, 'id'>
}

export const useFormSend = (from?: MaybeRefOrGetter<string>) => {
  const isFetching = ref(false)

  const { showThankYou } = useThankyouScreen()
  const { selectedLang } = useLang()

  const config = useDecocedRuntimeConfig()
  const { toast } = useToasts()
  const { pushDataLayerEvent } = useDataLayerEvents()

  const route = useRoute()

  const getFormContext = () => toValue(from) || route.path

  const getFormType = () => {
    const context = getFormContext()

    if (/quiz/i.test(context)) return 'quiz'
    if (/project/i.test(context) || route.path.includes('/projects/')) {
      return 'project'
    }
    if (/newsletter|subscribe/i.test(context)) return 'newsletter'
    if (route.path.includes('/contact')) return 'contact'

    return 'lead'
  }

  const isValidForm = (data: IData) => {
    const items = Object.entries(data)
    const pick = (k: string) =>
      items.find(
        e => e[0] === k || e[1]?.name === k || (e[1] as any)?._key === k
      )?.[1]?.value

    const email =
      pick('email') ||
      items.find(e => /email/i.test((e[1] as any)?.name || ''))?.[1]?.value
    const phone =
      pick('phone') ||
      items.find(e => /(phone|tel)/i.test((e[1] as any)?.name || ''))?.[1]
        ?.value
    const name =
      pick('name') ||
      items.find(e => /name/i.test((e[1] as any)?.name || ''))?.[1]?.value
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const PHONE_RE = /^\+?[0-9\s\-()]{7,}$/

    return Boolean(name && EMAIL_RE.test(email) && PHONE_RE.test(phone))
  }

  const submitHandler = async (data: IData, thankyouDelay = 300) => {
    if (isFetching.value) return

    if (!isValidForm(data)) {
      toast.error('Please fill required fields')
      return
    }

    const items = Object.entries(data)

    const formData = new FormData()
    const trafficSource = captureTrafficSource()

    formData.append('sitelang', selectedLang.value || '-')
    formData.append('from', getFormContext())
    formData.append('url', route.fullPath)
    formData.append('form_type', getFormType())

    Object.entries(trafficSource).forEach(([key, value]) => {
      if (value) formData.append(key, value)
    })

    items.forEach(item => {
      const [key, value] = item

      formData.append(key, value?.value ?? '')
    })

    try {
      isFetching.value = true
      pushDataLayerEvent('form_submit', {
        form_type: getFormType(),
        form_context: getFormContext(),
        ...trafficSource,
      })
      const key = config.public.FORMSPREE_KEY

      if (!key) {
        throw new Error('FORMSPREE is not connected')
      }

      const res = await fetch('https://formspree.io/f/' + key, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(
          `Form submit failed: ${res.status} ${text?.slice(0, 200)}`
        )
      }

      let okFlag = true
      try {
        const json = await res.json()
        // Formspree response { ok: true, ... }
        if (typeof json?.ok !== 'undefined') okFlag = !!json.ok
      } catch {
        console.log('Error parsing Formspree response JSON')
      }

      if (!okFlag) {
        throw new Error('FORMSPREE responded with ok=false')
      }

      if (okFlag && typeof window !== 'undefined') {
        pushDataLayerEvent('generate_lead', {
          form_type: getFormType(),
          form_context: getFormContext(),
          ...trafficSource,
        })
      }

      await delayPromise(thankyouDelay)
      showThankYou()
    } catch (error) {
      console.log(error)
      pushDataLayerEvent('form_error', {
        form_type: getFormType(),
        form_context: getFormContext(),
        error_type: error instanceof Error ? error.name : 'unknown_error',
      })
      toast.error('something went wrong, please try again later')
    } finally {
      setTimeout(() => {
        isFetching.value = false
      }, 500)
    }
  }

  return { submitHandler, isFetching }
}
