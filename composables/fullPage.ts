import { gsap } from '~/libs/gsap'

export const useFullPage = (
  el: MaybeRefOrGetter<HTMLElement>,
  count: MaybeRefOrGetter<number>,
  threshold = 1300
) => {
  const isFullPage = ref(false)

  const activePage = ref(1)
  const prevPage = ref(1)
  const isAnimating = ref(false)
  const direction = ref(1)

  const pagesCount = computed(() => toValue(count))

  let observer: IntersectionObserver | null = null

  const onScroll = (e: WheelEvent) => {
    if (isAnimating.value || !isFullPage.value) return

    direction.value = e.deltaY > 0 ? 1 : -1

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
      window.escroll.disabled = true
    } else {
      window.escroll.disabled = false
    }
  })

  const observeElement = () => {
    const target = toValue(el)
    if (!target) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.95) {
          console.log(entry.boundingClientRect)

          const offset = entry.boundingClientRect.top

          const scrollTop = document.documentElement.scrollTop + offset

          isAnimating.value = true

          gsap.to(document.documentElement, {
            scrollTop,
            duration: 0.3,
            onComplete: () => {
              isAnimating.value = false
            },
          })

          isFullPage.value = true
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

    window.addEventListener('wheel', onScroll)
  })

  onBeforeUnmount(() => {
    isFullPage.value = false
    if (observer) observer.disconnect()
    window.removeEventListener('wheel', onScroll)
  })

  return { isFullPage, activePage, prevPage, direction }
}
