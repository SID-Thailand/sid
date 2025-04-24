import type { TransitionProps } from 'vue'
import { gsap } from '../libs/gsap'
import { basicObject } from './basicObject'

export const pageTransition: TransitionProps = {
  mode: 'out-in',
  onEnter(_, done) {
    const revealer = document.querySelector('.revealer') as HTMLElement
    if (!revealer) {
      done()
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        done()

        tl.kill()

        revealer.style.display = 'none'
      },
    })
    tl.to(revealer, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0.5)

    basicObject.onEnter()
  },
  async onLeave(el, done) {
    const revealer = document.querySelector('.revealer') as HTMLElement

    if (!revealer) {
      done()
      return
    }

    const tl = gsap.timeline({
      onComplete: done,
    })

    tl.set(revealer, {
      clipPath: 'inset(0 0 0 100%)',
      display: 'block',
      opacity: 1,
    })

    const duration = 2.5

    tl.fromTo(
      revealer,
      { clipPath: 'inset(0 0 0 100%)' },
      {
        clipPath: 'inset(0 0 0 0%)',
        duration,
        ease: 'power4.inOut',
      },
      0.1
    )

    tl.to(
      el,
      {
        x: -400,
        ease: 'power4.inOut',
        duration,
      },
      0
    )
    basicObject.onLeave()
  },
}
