import { delayPromise } from '@emotionagency/utils'
import type { iInputData } from '~/types/headless/input'
import { resolveTrafficSource } from '~/utils/trafficSource'

export interface IData {
  [key: string]: Omit<iInputData, 'id'>
}

export const useFormSend = (from?: MaybeRefOrGetter<string>) => {
  const isFetching = ref(false)

  const { showThankYou } = useThankyouScreen()
  const { selectedLang } = useLang()

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

    const trafficSource = await resolveTrafficSource()
    const fields = Object.fromEntries(
      items.map(([key, value]) => [key, String(value?.value ?? '')])
    )

    try {
      isFetching.value = true
      const res = await fetch('/api/kommo-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields,
          formType: getFormType(),
          formContext: getFormContext(),
          pageUrl: window.location.href,
          siteLanguage: selectedLang.value || '-',
          trafficSource,
        }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(
          `Form submit failed: ${res.status} ${text?.slice(0, 200)}`
        )
      }

      let okFlag = false
      try {
        const json = await res.json()
        okFlag = json?.ok === true
      } catch {
        console.log('Error parsing Kommo response JSON')
      }

      if (!okFlag) {
        throw new Error('Kommo responded with ok=false')
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
      toast.error('something went wrong, please try again later')
    } finally {
      setTimeout(() => {
        isFetching.value = false
      }, 500)
    }
  }

  return { submitHandler, isFetching }
}
