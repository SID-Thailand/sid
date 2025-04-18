import { keysGenerator } from '@emotionagency/utils'

export const useDetectHeaderColor = ($el: Ref<HTMLElement | null>) => {
  const id = keysGenerator(12)

  const {
    registerBlackHeaderTrigger,
    unregisterBlackHeaderTrigger,
    $headerRef,
  } = useHeaderColor()
  const { isMenuOpened } = useAppState()

  const { isIntersecting, init, cleanup } = useIntersection(
    $el as Ref<HTMLElement>,
    $headerRef as Ref<HTMLElement>
  )

  const update = () => {
    if (isIntersecting.value && !isMenuOpened.value) {
      registerBlackHeaderTrigger(id)
    } else {
      unregisterBlackHeaderTrigger(id)
    }
  }

  onMounted(() => {
    init()
    update()
  })

  onUnmounted(() => {
    cleanup()
    unregisterBlackHeaderTrigger(id)
  })

  watch([isIntersecting, isMenuOpened], update, { immediate: true })
}
