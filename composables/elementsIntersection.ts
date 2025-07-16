import { gsap } from '~/libs/gsap'

export function useIntersection(
  targetA: Ref<HTMLElement | null>,
  targetB: Ref<HTMLElement | null>
) {
  const isIntersecting = ref(false)

  const checkIntersection = () => {
    const rect1 = targetA.value?.getBoundingClientRect()
    const rect2 = targetB.value?.getBoundingClientRect()

    if (!rect1 || !rect2) return false

    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    )
  }

  const update = () => {
    const intersecting = checkIntersection()

    if (intersecting !== isIntersecting.value) {
      isIntersecting.value = checkIntersection()
    }
  }

  const init = () => {
    gsap.ticker.add(update)
  }

  const cleanup = () => {
    gsap.ticker.remove(update)
  }

  return {
    isIntersecting,
    init,
    cleanup,
  }
}
