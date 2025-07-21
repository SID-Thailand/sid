import { ScrollTrigger } from '../libs/gsap'

export const resetScroll = () => {
  if (window.escroll) {
    try {
      window.escroll.reset()
      getScrollEl()?.scrollTo(0, 0)
      window.scrollTo(0, 0)
    } catch (e) {
      console.log(e)
    }
  }
  window.escroll && (window.escroll.disabled = false)

  ScrollTrigger.refresh()
}
