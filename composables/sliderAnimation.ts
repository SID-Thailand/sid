import { delayPromise } from '@emotionagency/utils'
import Emitter from 'tiny-emitter/dist/tinyemitter'
import { gsap } from '~/libs/gsap'

export const useSliderAnimation = (
  el: MaybeRefOrGetter<HTMLElement>,
  count: MaybeRefOrGetter<number>,
  treshold = 1300
) => {
  const target = toRef(el)
  const itemsCount = toRef(count)

  const { current, prev, direction, throttledNavigate } = useSlider(
    itemsCount.value,
    treshold
  )

  const $bgs = ref<NodeListOf<HTMLElement> | null>(null)
  const $bgsImages = ref<NodeListOf<HTMLElement> | null>(null)
  const $images = ref<NodeListOf<HTMLElement> | null>(null)
  const $imagesImg = ref<NodeListOf<HTMLElement> | null>(null)
  const $titles = ref<NodeListOf<HTMLElement> | null>(null)
  const $texts = ref<NodeListOf<HTMLElement> | null>(null)

  let titlesSplitter: (typeof TextSplitter.prototype)[] = []
  let textsSplitter: (typeof TextSplitter.prototype)[] = []

  const emitter = new Emitter()

  const setupInitialStates = async () => {
    $bgs.value?.forEach((bg, index) => {
      if (index > 0) {
        gsap.set(bg, {
          clipPath: 'inset(0 0 0 100%)',
        })

        gsap.set($bgsImages[index], {
          scale: 1.3,
        })

        gsap.set($images.value[index], {
          clipPath: 'inset(0 0 0 100%)',
        })

        gsap.set($imagesImg.value[index], {
          scale: 1.3,
        })
      }
    })

    resetSplitters(titlesSplitter)
    resetSplitters(textsSplitter)

    await nextTick()

    titlesSplitter = splitTexts($titles.value as NodeListOf<HTMLElement>)
    textsSplitter = splitTexts($texts.value as NodeListOf<HTMLElement>)
  }

  const onInit = (cb: (...agrs: any) => any) => {
    emitter.on('init', () => {
      cb()
    })
  }

  onMounted(async () => {
    await delayPromise(500)
    const el = target.value

    console.log(el)

    $bgs.value = el?.querySelectorAll('[data-f-bg]') as NodeListOf<HTMLElement>

    $bgsImages.value = el?.querySelectorAll(
      '[data-f-bg-i]'
    ) as NodeListOf<HTMLElement>

    $images.value = el?.querySelectorAll(
      '[data-f-img]'
    ) as NodeListOf<HTMLElement>

    $imagesImg.value = el?.querySelectorAll(
      '[data-f-img-i]'
    ) as NodeListOf<HTMLElement>

    $titles.value = el?.querySelectorAll(
      '[data-f-title]'
    ) as NodeListOf<HTMLElement>

    $texts.value = el?.querySelectorAll(
      '[data-f-text]'
    ) as NodeListOf<HTMLElement>

    await setupInitialStates()

    window.addEventListener('keydown', handleKeyDown)

    emitter.emit('init')
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      throttledNavigate(-1)
    } else if (e.key === 'ArrowRight') {
      throttledNavigate(1)
    }
  }

  const animate = () => {
    const currentIndex = current.value
    const prevIndex = prev.value

    const els = {
      current: {
        bg: $bgs.value[currentIndex],
        bgImg: $bgsImages.value[currentIndex],
        item: $images.value[currentIndex],
        itemImg: $imagesImg.value[currentIndex],
        title: $titles.value[currentIndex],
        text: $texts.value[currentIndex],
      },
      prev: {
        bg: $bgs.value[prevIndex],
        bgImg: $bgsImages.value[prevIndex],
        item: $images.value[prevIndex],
        itemImg: $imagesImg.value[prevIndex],
        title: $titles.value[prevIndex],
        text: $texts.value[prevIndex],
      },
    }

    const duration = 1.5
    const textDuration = 1

    const tl = gsap.timeline({
      defaults: {
        duration,
        ease: 'power2.out',
      },
    })

    const isForward = direction.value === 1

    const from = 'inset(0 0 0 100%)'
    const to = 'inset(0 100% 0 0)'

    tl.set(els.current.bg, { clipPath: isForward ? from : to })
    tl.set(els.current.item, { clipPath: isForward ? from : to })

    tl.set(els.current.bgImg, { scale: 1.3 })
    tl.set(els.current.itemImg, { scale: 1.3 })

    els.prev.bg &&
      tl.to(
        els.prev.bg,
        {
          clipPath: isForward ? to : from,
        },
        0
      )

    els.prev.bgImg &&
      tl.to(
        els.prev.bgImg,
        {
          scale: 1.3,
        },
        0
      )

    els.prev.item &&
      tl.to(els.prev.item, { clipPath: isForward ? to : from }, 0)

    els.prev.itemImg && tl.to(els.prev.itemImg, { scale: 1.3 }, 0)

    tl.to(els.current.bg, { clipPath: 'inset(0 0% 0 0%)' }, 0)
    tl.to(els.current.item, { clipPath: 'inset(0 0% 0 0%)' }, 0)

    tl.to(els.current.bgImg, { scale: 1 }, 0)
    tl.to(els.current.itemImg, { scale: 1 }, 0)

    const curTitleWords = getWords(els.current.title as HTMLElement)
    const prevTitleWords = getWords(els.prev.title as HTMLElement)

    const curTextWords = getWords(els.current.text as HTMLElement)
    const prevTextWords = getWords(els.prev.text as HTMLElement)

    animateWordExit(prevTitleWords, isForward, textDuration, 0)
    animateWords(curTitleWords, isForward, textDuration, 0)

    animateWordExit(prevTextWords, isForward, textDuration, 0)
    animateWords(curTextWords, isForward, textDuration, 0)
  }

  watch(current, animate)

  return {
    current,
    prev,
    direction,
    throttledNavigate,
    onInit,
  }
}
