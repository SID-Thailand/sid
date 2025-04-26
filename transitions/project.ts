import type { TransitionProps } from 'vue'

import { delayPromise } from '@emotionagency/utils'
import { Flip, gsap } from '../libs/gsap'
import { basicObject } from './basicObject'

let $photo = null

let leaveDoneCallback: () => void

const prepareItem = ($item: HTMLElement) => {
  const $parent = $item.closest('[data-t-assets]')

  const bounds = $parent.getBoundingClientRect()

  $item.style.position = 'fixed'
  $item.style.top = `${bounds.top}px`
  $item.style.left = `${bounds.left}px`
  $item.style.width = `${bounds.width}px`
  $item.style.height = `${bounds.height}px`
  $item.style.objectFit = 'cover'
  $item.style.zIndex = `10`
  $item.style.opacity = `1`

  document.body.appendChild($item)

  return $item
}

export const projectTransition: TransitionProps = {
  mode: 'in-out',
  name: 'project',
  css: false,
  appear: true,
  async onEnter(el: HTMLElement, done) {
    const { init } = useLoadingAnimation()

    init(el, 0.85)

    el.style.width = '100%'
    el.style.position = 'fixed'
    el.style.top = '0'
    el.style.left = '0'
    el.style.zIndex = '3'
    el.style.opacity = '0'
    await delayPromise(200)
    el.style.opacity = '1'

    const $to = el.querySelector('.project-hero__img-wrapper')
    const state = Flip.getState($photo, {
      props: 'zIndex',
    })
    Object.assign($photo.style, {
      position: 'relative',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      margin: '0',
    })

    $to.appendChild($photo)

    Flip.from(state, {
      duration: 2.5,
      ease: 'power2.inOut',
      absolute: true,
      zIndex: 1,
      onComplete: () => {
        done()
        leaveDoneCallback()
        basicObject.onEnter()
        $photo = null
        el.style.position = 'relative'
      },
    })
  },
  async onLeave(el, done) {
    leaveDoneCallback = done

    await delayPromise(10)

    const route = useRoute()
    const slug = route.params.id

    $photo = el.querySelector(`[data-t-img][data-slug="${slug}"]`)

    const $card = el.querySelector('[data-t-card]') as HTMLElement

    const { offsetX, offsetY } = getOffsetFromCenter($card)

    $photo = prepareItem($photo)

    basicObject.onLeave()

    gsap.to($card, {
      duration: 2,
      scale: 2,
      ease: 'power2.inOut',
      x: offsetX,
      y: offsetY,
    })

    gsap.to(el, {
      duration: 2,
      opacity: 0,
      ease: 'power2.out',
    })
  },
}
