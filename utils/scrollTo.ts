import { gsap } from '../libs/gsap'

export const scrollTo = (
  to: number,
  immediate = false,
  onComplete = () => {}
) => {
  const scrollTop = getScrollEl().scrollTop + to

  gsap.to(getScrollEl(), {
    duration: immediate ? 0 : 0.8,
    scrollTop,
    ease: 'power2.out',
    onComplete,
  })
}
