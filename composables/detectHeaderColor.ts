export const useDetectHeaderColor = ($el: Ref<HTMLElement | null>) => {
  const { setHeaderColor, $headerRef } = useHeaderColor()
  const { isMenuOpened } = useAppState()

  const { isIntersecting, init, cleanup } = useIntersection(
    $el as Ref<HTMLElement>,
    $headerRef as Ref<HTMLElement>
  )

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    cleanup()
  })

  watch([isIntersecting, isMenuOpened], () => {
    if (isIntersecting.value && !isMenuOpened.value) {
      setHeaderColor('black')
    } else {
      setHeaderColor('white')
    }
  })
}
