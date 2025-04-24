import type { TransitionProps } from 'vue'
import gsap from 'gsap'
import { basicObject } from './basicObject'

export const pageTransition: TransitionProps = {
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

    tl.fromTo(
      revealer,
      { clipPath: 'inset(0 0 0 100%)' },
      {
        clipPath: 'inset(0 0 0 0%)',
        duration: 2.5,
        ease: 'power4.inOut',
      },
      0.1
    )

    tl.to(
      el,
      {
        x: -400,
        ease: 'power4.inOut',
        duration: 2.5,
      },
      0
    )
    basicObject.onLeave()
  },
}
