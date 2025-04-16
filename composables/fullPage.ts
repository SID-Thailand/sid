import { gsap } from '~/libs/gsap'

export const useFullPage = (
  el: MaybeRefOrGetter<HTMLElement>,
  count: MaybeRefOrGetter<number>,
  threshold = 900
) => {
  const { isFullPage } = useAppState()

  const activePage = ref(1)
  const prevPage = ref(1)
  const isAnimating = ref(false)
  const direction = ref(1)

  const pagesCount = computed(() => toValue(count))

  let observer: IntersectionObserver | null = null

  let touchY = null

  const onTouchStart = (e: TouchEvent) => {
    const firstTouch = e.touches[0]

    touchY = firstTouch.clientY
  }

  const stopScroll = () => {
    window.escroll.disabled = true
    getScrollEl().classList.add('full-page')
  }

  const startScroll = () => {
    window.escroll.disabled = false
    getScrollEl().classList.remove('full-page')
  }

  const onScroll = (e: WheelEvent | TouchEvent) => {
    if (isAnimating.value || !isFullPage.value) return
    e.preventDefault()

    if (e instanceof WheelEvent) {
      direction.value = e.deltaY > 0 ? 1 : -1
    } else {
      const yUp = e.touches[0].clientY

      const yDiff = touchY - yUp

      if (yDiff > 0) {
        direction.value = 1
      } else {
        direction.value = -1
      }

      touchY = null
    }

    const newPage = activePage.value + direction.value

    if (newPage < 1 || newPage > pagesCount.value) {
      isFullPage.value = false
      return
    }
    isAnimating.value = true

    prevPage.value = activePage.value
    activePage.value = newPage

    setTimeout(() => {
      isAnimating.value = false
    }, threshold)
  }

  watch(isFullPage, value => {
    if (value) {
      stopScroll()
    } else {
      startScroll()
    }
  })

  const observeElement = () => {
    const target = toValue(el)
    if (!target) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.95) {
          isFullPage.value = true

          const offset = entry.boundingClientRect.top

          const currentScrollPosition = getScrollEl().scrollTop

          const scrollTop = currentScrollPosition + offset

          gsap.to(getScrollEl(), {
            scrollTo: { y: scrollTop, autoKill: true },
            duration: 0.25,
          })
        } else {
          isFullPage.value = false
        }
      },
      {
        root: null,
        threshold: [0.95],
      }
    )

    observer.observe(target)
  }

  onMounted(() => {
    observeElement()

    window.addEventListener('wheel', onScroll, { passive: false })
    window.addEventListener('touchstart', onTouchStart, false)
    window.addEventListener('touchmove', onScroll, { passive: false })
    window.addEventListener('scroll', e => {
      e.preventDefault()
    })
  })

  onBeforeUnmount(() => {
    isFullPage.value = false
    if (observer) observer.disconnect()
    window.removeEventListener('wheel', onScroll)
    window.removeEventListener('touchstart', onTouchStart, false)
    window.removeEventListener('touchmove', onScroll)
  })

  return { isFullPage, activePage, prevPage, direction }
}
