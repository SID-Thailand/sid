import { delayPromise } from '@emotionagency/utils'
import type { iInputData } from '~/types/headless/input'

export interface IData {
  [key: string]: Omit<iInputData, 'id'>
}

export const useFormSend = (from?: MaybeRefOrGetter<string>) => {
  const isFetching = ref(false)

  const { selectedLang } = useLang()
  const { showThankYou } = useThankyouScreen()

  const config = useDecocedRuntimeConfig()
  const { toast } = useToasts()

  const route = useRoute()

  const submitHandler = async (data: IData, thankyouDelay = 300) => {
    const items = Object.entries(data)

    const formData = new FormData()

    formData.append('sitelang', selectedLang.value || '-')
    formData.append('from', toValue(from) || route.path)

    items.forEach(item => {
      const [key, value] = item

      formData.append(key, value?.value)
    })

    try {
      isFetching.value = true
      const key = config.public.FORMSPREE_KEY

      if (!key) {
        throw new Error('FORMSPREE is not connected')
      }

      await fetch('https://formspree.io/f/' + key, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

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
