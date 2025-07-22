import emitter from 'tiny-emitter/instance'
import { state } from '../state'
import type { IController } from './IController'

export class DraggableController implements IController {
  $slider: HTMLElement

  private startX = 0

  constructor($slider: HTMLElement) {
    this.$slider = $slider
  }

  private onMousemove(e) {
    e.preventDefault()

    if (state.disabled) return

    const left = e.clientX ?? e.targetTouches[0].clientX

    const delta = left - this.startX
    this.startX = left

    state.targetX -= delta
  }

  private onMousedown(e) {
    e.preventDefault()

    if (state.disabled) return

    document.documentElement.addEventListener('mousemove', this.onMousemove)
    document.documentElement.addEventListener('touchmove', this.onMousemove, {
      passive: false,
    })

    this.startX = e.clientX ?? e.targetTouches[0].clientX

    this.$slider.classList.add('is-grabbing')

    emitter.emit('slider:grab')
  }

  private onMouseup() {
    if (state.disabled) return

    document.documentElement.removeEventListener('mousemove', this.onMousemove)
    document.documentElement.removeEventListener('touchmove', this.onMousemove)

    this.$slider.classList.remove('is-grabbing')

    emitter.emit('slider:release')
  }

  subscribe() {
    const methods = ['onMousemove', 'onMousedown', 'onMouseup']

    methods.forEach(fn => {
      this[fn] = this[fn].bind(this)
    })

    this.$slider.addEventListener('mousedown', this.onMousedown, {
      passive: true,
    })

    this.$slider.addEventListener('touchstart', this.onMousedown, {
      passive: false,
    })

    document.documentElement.addEventListener('mouseup', this.onMouseup)
    document.documentElement.addEventListener('touchend', this.onMouseup)
  }

  unsubscribe() {
    this.$slider.removeEventListener('mousedown', this.onMousedown)
    this.$slider.removeEventListener('touchstart', this.onMousedown)
    document.documentElement.removeEventListener('mousemove', this.onMousemove)
    document.documentElement.removeEventListener('touchmove', this.onMousemove)
    document.documentElement.removeEventListener('mouseup', this.onMouseup)
    document.documentElement.removeEventListener('touchend', this.onMouseup)
  }
}
