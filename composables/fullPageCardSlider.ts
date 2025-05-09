import { delayPromise } from '@emotionagency/utils'
import { TextSplitter } from './../utils/textSplitter'
import { gsap } from '~/libs/gsap'
import Emitter from 'tiny-emitter/dist/tinyemitter'

const animateWords = (
  words: NodeListOf<Element> | any[],
  isForward: boolean,
  time: number,
  offset = 0
) => {
  if (!words.length) return

  const y = isForward ? '130%' : '-130%'

  gsap.fromTo(words, { y }, { y: '0%', duration: time, delay: offset })
}

const animateWordExit = (
  words: NodeListOf<Element> | any[],
  isForward: boolean,
  time: number,
  offset = 0
) => {
  if (!words.length) return

  const y = isForward ? '-130%' : '130%'

  gsap.to(words, { y, duration: time, delay: offset })
}

const getWords = (selector: HTMLElement | null) =>
  selector?.querySelectorAll(`.word`) ?? []

const resetSplitters = (splitters: (typeof TextSplitter.prototype)[]) => {
  if (!splitters?.length) return
  splitters.forEach(splitter => {
    splitter.revert()
  })
  splitters = []
}

const splitTexts = (items: NodeListOf<HTMLElement>) => {
  const splitters: (typeof TextSplitter.prototype)[] = []

  items?.forEach((item, idx) => {
    const textSplitter = new TextSplitter(item, {
      splitTypeTypes: 'lines,words',
    })

    splitters.push(textSplitter)

    if (idx === 0) {
      return
    }

    gsap.set(item.querySelectorAll('.word'), { y: '120%' })
  })

  return splitters
}

export const useFullPageCardSlider = (
  el: MaybeRefOrGetter<HTMLElement>,
  count: MaybeRefOrGetter<number>
) => {
  const target = toRef(el)

  const itemsCount = toRef(count)

  const { activePage, prevPage, direction } = useFullPage(
    target as Ref<HTMLElement>,
    itemsCount
  )

  const $bgs = ref<NodeListOf<HTMLElement> | null>(null)
  const $images = ref<NodeListOf<HTMLElement> | null>(null)
  const $titles = ref<NodeListOf<HTMLElement> | null>(null)
  const $texts = ref<NodeListOf<HTMLElement> | null>(null)

  let titlesSplitter: (typeof TextSplitter.prototype)[] = []
  let textsSplitter: (typeof TextSplitter.prototype)[] = []

  const emitter = new Emitter()

  const setupInitialStates = async () => {
    $bgs.value?.forEach((bg, index) => {
      if (index > 0) {
        gsap.set(bg, {
          scale: 1.3,
          clipPath: 'inset(100% 0 0 0)',
        })

        gsap.set($images.value[index], {
          scale: 1.3,
          clipPath: 'inset(100% 0 0 0)',
        })
      }
    })

    resetSplitters(titlesSplitter)
    resetSplitters(textsSplitter)

    await nextTick()

    titlesSplitter = splitTexts($titles.value as NodeListOf<HTMLElement>)
    textsSplitter = splitTexts($texts.value as NodeListOf<HTMLElement>)
  }

  const animateSections = () => {
    const currentIndex = activePage.value - 1
    const prevIndex = prevPage.value - 1

    const elements = {
      current: {
        bg: $bgs.value[currentIndex],
        item: $images.value[currentIndex],
        title: $titles.value[currentIndex],
        text: $texts.value[currentIndex],
      },
      prev: {
        bg: $bgs.value[prevIndex],
        item: $images.value[prevIndex],
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

    const { current, prev } = elements

    if (isForward) {
      prev.bg && tl.to(prev.bg, { scale: 1.3 }, 0)
      prev.item && tl.to(prev.item, { scale: 1.3 }, 0)
    }

    tl.to(current.bg, { scale: 1, clipPath: 'inset(0% 0 0 0)' }, 0)
    tl.to(current.item, { scale: 1, clipPath: 'inset(0% 0 0 0)' }, 0)

    if (!isForward) {
      prev.bg &&
        tl.to(prev.bg, { scale: 1.3, clipPath: 'inset(100% 0 0 0)' }, 0)
      prev.item &&
        tl.to(prev.item, { scale: 1.3, clipPath: 'inset(100% 0 0 0)' }, 0)
    }

    const curTitleWords = getWords(current.title as HTMLElement)
    const prevTitleWords = getWords(prev.title as HTMLElement)

    const curTextWords = getWords(current.text as HTMLElement)
    const prevTextWords = getWords(prev.text as HTMLElement)

    animateWordExit(prevTitleWords, isForward, textDuration, 0)
    animateWords(curTitleWords, isForward, textDuration, 0)

    animateWordExit(prevTextWords, isForward, textDuration, 0)
    animateWords(curTextWords, isForward, textDuration, 0)
  }

  watch(activePage, animateSections)

  const onInit = (cb: (...agrs: any) => any) => {
    emitter.on('init', () => {
      cb()
    })
  }

  onMounted(async () => {
    await delayPromise(500)
    $bgs.value = target.value?.querySelectorAll(
      '[data-f-bg]'
    ) as NodeListOf<HTMLElement>

    $images.value = target.value?.querySelectorAll(
      '[data-f-img]'
    ) as NodeListOf<HTMLElement>

    $titles.value = target.value?.querySelectorAll(
      '[data-f-title]'
    ) as NodeListOf<HTMLElement>

    $texts.value = target.value?.querySelectorAll(
      '[data-f-text]'
    ) as NodeListOf<HTMLElement>

    await setupInitialStates()
    emitter.emit('init')
  })

  return {
    activePage,
    prevPage,
    direction,
    onInit,
  }
}
