import { state } from '../state'
import type { IController } from './IController'

export class ClickController implements IController {
  constructor(readonly $el: HTMLElement) {
    this.onClick = this.onClick.bind(this)
  }

  onClick(e: MouseEvent) {
    const $target = e.target as HTMLElement

    const $slide = $target.closest('[data-slide]')

    const $targetSlide = $target.dataset.slide ? $target : $slide

    if ($targetSlide) {
      // move targetX to slide center
      const rect = $targetSlide.getBoundingClientRect()
      const offset = rect.left + rect.width / 2 - window.innerWidth / 2

      state.targetX = state.targetX + offset
    }
  }

  subscribe() {
    this.$el.addEventListener('click', this.onClick)
  }

  unsubscribe() {
    this.$el.removeEventListener('click', this.onClick)
  }
}
