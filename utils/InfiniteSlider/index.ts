import emitter from 'tiny-emitter/instance'

import { resize, lerp, matrixTransform } from '@emotionagency/utils'

import { resetState, state } from './state'
import { DraggableController } from './controllers/Draggable'

import { KeyboardController } from './controllers/Keyboard'
import { AutoController } from './controllers/Auto'
import { gsap } from '~/libs/gsap'

interface IControllers {
  draggable: typeof DraggableController.prototype
  keyboard: typeof KeyboardController.prototype
  auto: typeof AutoController.prototype
}

export class Slider {
  $sliderInner: HTMLElement
  $slides: NodeListOf<HTMLImageElement>

  controllers: IControllers = {
    draggable: null,
    keyboard: null,
    auto: null,
  }

  constructor(
    readonly $el: HTMLElement,
    readonly duration: number
  ) {
    this.$sliderInner = this.$el?.querySelector('[data-slider-inner]')

    this.$slides = this.$el?.querySelectorAll('[data-slide]')
  }

  init() {
    if (!this.$el) {
      console.warn('$el is not defined')
      return
    }

    this.controllers.draggable = new DraggableController(this.$el)
    this.controllers.keyboard = new KeyboardController(this.$el)
    this.controllers.auto = new AutoController(this.$el, this.duration)

    Object.keys(this.controllers).forEach(key => {
      this.controllers[key].subscribe()
    })

    this.animate = this.animate.bind(this)
    this.resize = this.resize.bind(this)

    gsap.ticker.add(this.animate)

    resize.on(this.resize)
  }

  startSetup() {
    this.moveOneCirlce()
  }

  moveOneCirlce() {
    state.targetX = state.targetX + state.max + 60
  }

  get disabled() {
    return state.disabled
  }

  set disabled(value: boolean) {
    state.disabled = value
  }

  resize() {
    state.max = this.$sliderInner.scrollWidth / 2
  }

  animate() {
    if (state.disabled) return

    state.posX = lerp(state.posX, state.targetX, 0.05)
    const notSmoothVelocity = state.targetX - state.posX

    state.velocity = notSmoothVelocity

    state.smoothVelocity = lerp(state.velocity, notSmoothVelocity, 0.2)

    state.isMoving = Math.abs(notSmoothVelocity) > 0.1

    if (!state.isMoving) {
      return
    }

    if (state.posX > state.max) {
      state.targetX = state.min + state.velocity
      state.posX = state.min
    } else if (state.posX < state.min) {
      state.targetX = state.max + state.velocity
      state.posX = state.max
    }

    this.$sliderInner.style.transform = `${matrixTransform({
      move: {
        x: -state.posX,
        y: 0,
        z: 0,
      },
    })}`

    emitter.emit('slider:animate', state.smoothVelocity)
  }

  destroy() {
    Object.keys(this.controllers).forEach(key => {
      this.controllers[key]?.unsubscribe()
    })

    gsap.ticker.remove(this.animate)
    resize.off(this.resize)

    resetState()
  }
}
