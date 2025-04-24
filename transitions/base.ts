import type { TransitionProps } from 'vue'
import { gsap } from '../libs/gsap'
import { basicObject } from './basicObject'

const duration = 2
const ease = 'power3.inOut'

export const pageTransition: TransitionProps = {
  mode: 'out-in',
  onEnter(el, done) {
    const revealer = document.querySelector('.revealer') as HTMLElement
    if (!revealer) {
      done()
      return
    }

    const tl = gsap.timeline({
      defaults: {
        duration,
        ease,
      },
      onComplete: () => {
        done()

        tl.revert()
        tl.kill()

        revealer.style.display = 'none'
      },
    })
    tl.to(revealer, {
      clipPath: 'inset(0 0 100% 0)',
    })

    tl.fromTo(
      el,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      0
    )

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
      defaults: {
        duration,
        ease,
      },
    })

    tl.set(revealer, {
      clipPath: 'inset(100% 0 0 0)',
      display: 'block',
      opacity: 1,
    })

    tl.to(
      revealer,
      {
        clipPath: 'inset(0% 0 0 0)',
      },
      0.1
    )

    tl.to(
      el,
      {
        y: -200,
        opacity: 0,
      },
      0
    )
    basicObject.onLeave()
  },
}
