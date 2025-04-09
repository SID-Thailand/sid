import { raf } from '@emotionagency/utils'
import { state } from '../state'
import type { IController } from './IController'

export class AutoController implements IController {
  constructor(
    readonly $el: HTMLElement,
    readonly duration: number
  ) {
    this.move = this.move.bind(this)
  }

  move() {
    const dir = -state.velocity > 0 ? 1 : -1
    state.targetX -= (this.duration / 10) * dir
  }

  subscribe() {
    raf.on(this.move)
  }

  unsubscribe() {
    raf.off(this.move)
  }
}
