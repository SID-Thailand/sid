import { raf } from '@emotionagency/utils'
import { state } from '../state'
import type { IController } from './IController'

export class AutoController implements IController {
  lastTime = performance.now()
  constructor(
    readonly $el: HTMLElement,
    readonly duration: number
  ) {
    this.move = this.move.bind(this)
  }

  move() {
    const now = performance.now()
    const delta = now - this.lastTime
    this.lastTime = now

    if (!this.isInViewport) {
      return
    }

    const dir = -state.velocity > 0 ? 1 : -1

    const speed = this.duration * 10
    state.targetX -= speed * (delta / 1000) * dir
  }

  get isInViewport() {
    const bounds = this.$el.getBoundingClientRect()

    const treshhold = 200

    const isInViewport =
      bounds.top < window.innerHeight + treshhold && bounds.bottom > -treshhold

    return isInViewport
  }

  subscribe() {
    raf.on(this.move)
  }

  unsubscribe() {
    raf.off(this.move)
  }
}
