import { gsap } from '~/libs/gsap'

export const useFullPageAnimation = (
  el: MaybeRefOrGetter<HTMLElement>,
  count: MaybeRefOrGetter<number>,
  moveText: MaybeRefOrGetter<boolean>
) => {
  const target = toRef(el)
  const isMoveText = toRef(moveText)
  const itemsCount = toRef(count)

  const { activePage, prevPage, direction } = useFullPage(
    target as Ref<HTMLElement>,
    itemsCount
  )

  const $assets = ref<NodeListOf<HTMLElement> | null>(null)
  const $texts = ref<NodeListOf<HTMLElement> | null>(null)
  const $scroller = ref<HTMLElement | null>(null)

  const setupInitialStates = (): void => {
    if (!$assets.value) return

    $assets.value.forEach((item, index) => {
      if (index > 0) {
        gsap.set(item, {
          scale: 1.3,
          clipPath: 'inset(100% 0 0 0)',
        })
      }
    })
  }

  onMounted(async () => {
    await nextTick()

    if (!target) return

    $assets.value = target.value?.querySelectorAll(
      '[data-f-asset]'
    ) as NodeListOf<HTMLElement>

    $texts.value = target.value?.querySelectorAll(
      '[data-f-text]'
    ) as NodeListOf<HTMLElement>

    $scroller.value = target.value?.querySelector(
      '[data-f-scroller]'
    ) as HTMLElement

    setupInitialStates()
  })

  const animateSections = (): void => {
    if (!$assets.value) return

    const currentIndex = activePage.value - 1
    const prevIndex = prevPage.value - 1

    const $textsList = $texts.value

    const $currentImage = $assets.value[currentIndex] as HTMLElement
    const $prevImage = $assets.value[prevIndex] as HTMLElement

    const $currentWrapper = $textsList[currentIndex]
    const $prevWrapper = $textsList[currentIndex - 1]

    const $content = $scroller.value

    const currentWrapperTop = $currentWrapper.offsetTop

    const duration = 1.5

    const tl = gsap.timeline({
      defaults: {
        duration,
        ease: 'power2.out',
      },
    })

    if (isMoveText.value) {
      tl.to($content, { y: -currentWrapperTop }, 0)

      if ($prevWrapper)
        fadeOut({ tl, el: $prevWrapper as HTMLElement, offset: 0.5 })
      fadeIn({ tl, el: $currentWrapper as HTMLElement })
    }

    const isForward = currentIndex > prevIndex

    if (isForward) {
      if ($prevImage)
        scaleOut({
          tl,
          el: $prevImage,
          inset: '0 0 0 0',
        })
      scaleIn({
        tl,
        el: $currentImage,
      })
    } else {
      scaleIn({
        tl,
        el: $currentImage,
      })

      if ($prevImage)
        scaleOut({
          tl,
          el: $prevImage,
          inset: '100% 0 0 0',
        })
    }
  }

  watch(activePage, () => {
    animateSections()
  })

  return {
    activePage,
    prevPage,
    direction,
    $assets,
    $texts,
    $scroller,
  }
}
