import type { TransitionProps } from 'vue'
import { gsap } from '../libs/gsap'

export const pageTransition: TransitionProps = {
  mode: 'out-in',
  css: false,
  appear: true,
  onEnter(el, done) {
    gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, onComplete: done }
    )
  },
  onLeave(el, done) {
    gsap.to(el, { opacity: 0, duration: 0.25, onComplete: done })
  },
}
