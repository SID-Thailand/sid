import { state } from '../state'
import type { IController } from './IController'

export class KeyboardController implements IController {
  pressedTimer = 0
  interval = null
  constructor(readonly $el: HTMLElement) {
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  onKeyDown(e: KeyboardEvent) {
    if (state.disabled) return

    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    if (e.repeat) return
    let dir = 1

    this.interval = setInterval(() => {
      this.pressedTimer++
      state.targetX += dir * 30
    }, 16)

    switch (e.key) {
      case 'ArrowLeft':
        dir = -1
        break
      case 'ArrowRight':
        dir = 1
        break
    }
  }

  onKeyUp() {
    clearInterval(this.interval)
    this.pressedTimer = 0
  }

  subscribe() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  }

  unsubscribe() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
  }
}
