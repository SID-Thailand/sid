import { gsap } from '../libs/gsap'

export const scrollTo = (
  to: number,
  immediate = false,
  onComplete = () => {}
) => {
  const scrollTop = getScrollEl().scrollTop + to

  window.escroll.disabled = true

  gsap.to(getScrollEl(), {
    duration: immediate ? 0 : 0.8,
    scrollTo: { y: scrollTop, autoKill: true },
    onComplete: () => {
      window.escroll.state.position = scrollTop
      window.escroll.state.vsPosition = scrollTop
      window.escroll.disabled = false

      if (onComplete) {
        onComplete()
      }
    },
  })
}
