import { state } from '../state'
import type { IController } from './IController'
import { gsap } from '~/libs/gsap'

export class AutoController implements IController {
  constructor(
    readonly $el: HTMLElement,
    readonly duration: number
  ) {
    this.move = this.move.bind(this)
  }

  move(_: number, delta: number) {
    if (!this.isInViewport || this.isTabInactive) {
      return
    }

    const dir = -state.velocity > 0 ? 1 : -1

    const speed = 1000 / this.duration
    state.targetX -= speed * (delta / 1000) * dir
  }

  get isInViewport() {
    const bounds = this.$el.getBoundingClientRect()

    const treshhold = 200

    const isInViewport =
      bounds.top < window.innerHeight + treshhold && bounds.bottom > -treshhold

    return isInViewport
  }

  get isTabInactive() {
    return document.hidden
  }

  subscribe() {
    gsap.ticker.add(this.move)
  }

  unsubscribe() {
    gsap.ticker.remove(this.move)
  }
}
