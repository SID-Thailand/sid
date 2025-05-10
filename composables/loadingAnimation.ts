import { delayPromise } from '@emotionagency/utils'
import { gsap } from '~/libs/gsap'

export const useLoadingAnimation = () => {
  const { appear } = useLogoAnimation()
  const isFirstLoad = useState('isFirstLoad', () => true)

  const getElements = (parent?: HTMLElement) => {
    const $el = parent || document

    const $image = $el.querySelector('[data-preload]') as HTMLElement | null
    const $fullImage = $el.querySelector(
      '[data-full-image]'
    ) as HTMLElement | null
    const $title = $el.querySelector('[data-title]') as HTMLElement | null
    const $logo = $el.querySelector('.header__logo') as HTMLElement | null
    const $t = $el.querySelectorAll('[data-t]')
    const $o = $el.querySelectorAll('[data-o]')
    return { $image, $fullImage, $title, $logo, $t, $o }
  }

  const getLogoOffset = ($logo: HTMLElement) => {
    const logoBounds = $logo.getBoundingClientRect()
    const screenCenterX = window.innerWidth / 2
    const screenCenterY = window.innerHeight / 2
    const logoCenterX = logoBounds.left + logoBounds.width / 2
    const logoCenterY = logoBounds.top + logoBounds.height / 2

    return {
      x: screenCenterX - logoCenterX,
      y: screenCenterY - logoCenterY,
    }
  }

  const animate = async (parent?: HTMLElement, wait = 0.2) => {
    document.documentElement.style.cursor = 'wait'
    document.body.style.pointerEvents = 'none'

    const { $image, $fullImage, $title, $logo, $t, $o } = getElements(parent)
    await delayPromise(200)

    const delay = isFirstLoad.value ? 1.7 : wait

    const tl = gsap.timeline({
      onComplete: () => {
        window.escroll.disabled = false
        titleSplitter?.revert()
        tl.revert()

        document.documentElement.style.cursor = 'auto'
        document.body.style.pointerEvents = 'auto'
      },
    })

    if ($image) {
      tl.set($image, { width: '100vw', height: '100vh' })
    }

    if ($fullImage) {
      tl.set($fullImage, {
        opacity: 0,
        clipPath: 'inset(25%)',
      })
    }

    tl.set($t, { opacity: 0, y: 50 })
    tl.set($o, { opacity: 0 })

    if (isFirstLoad.value && $logo) {
      const { x, y } = getLogoOffset($logo)
      tl.set($logo, { x, y, scale: 3 })
      appear()
      tl.to(
        $logo,
        {
          duration: 1,
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
        },
        1.7
      )
    }

    // Animate image resize
    if ($image) {
      const imageBounds = $image.getBoundingClientRect()
      tl.to(
        $image,
        {
          duration: 2,
          width: imageBounds.width,
          height: imageBounds.height,
          ease: 'power2.out',
        },
        delay
      )
    }

    if ($fullImage) {
      tl.to(
        $fullImage,
        {
          duration: 2,
          opacity: 1,
          clipPath: 'inset(0%)',
          ease: 'power2.out',
        },
        delay
      )
    }

    let titleSplitter: typeof TextSplitter.prototype | null = null
    let $lines: HTMLElement[] | null = null

    if ($title) {
      titleSplitter = new TextSplitter($title, {
        splitTypeTypes: 'lines,words',
      })
      $lines = titleSplitter.getLines()
      gsap.set($lines, { y: '100%', clipPath: 'inset(0 0 110% 0)' })

      tl.to(
        $lines,
        {
          duration: 2,
          y: '0%',
          clipPath: 'inset(0 0 -110% 0)',
          stagger: 0.1,
          opacity: 1,
          ease: 'power2.out',
          overwrite: true,
        },
        delay
      )
    }

    if ($t.length) {
      tl.to(
        $t,
        {
          duration: 1.5,
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: 'power2.out',
        },
        delay + 0.3
      )
    }

    if ($o.length) {
      tl.to(
        $o,
        {
          duration: 2,
          opacity: 1,
          stagger: 0.2,
          ease: 'power2.out',
        },
        delay + 1.2
      )
    }

    isFirstLoad.value = false
  }

  return {
    isFirstLoad,
    init: animate,
  }
}
