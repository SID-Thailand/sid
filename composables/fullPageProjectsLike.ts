import { gsap } from '~/libs/gsap'

const animateWords = (
  words: NodeListOf<Element> | any[],
  isForward: boolean,
  time: number,
  offset = 0
) => {
  if (!words.length) return

  const y = isForward ? '100%' : '-100%'

  gsap.fromTo(words, { y }, { y: '0%', duration: time, delay: offset })
}

const animateWordExit = (
  words: NodeListOf<Element> | any[],
  isForward: boolean,
  time: number,
  offset = 0
) => {
  if (!words.length) return

  const y = isForward ? '-100%' : '100%'

  gsap.to(words, { y, duration: time, delay: offset })
}

const getWords = (selector: HTMLElement | null) =>
  selector?.querySelectorAll(`.word`) ?? []

export const useFullPageProjectsLike = (
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

  let titlesSplitter: (typeof TextSplitter.prototype)[] = []

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

    if (titlesSplitter.length > 0) {
      titlesSplitter.forEach(splitter => {
        splitter.revert()
      })
      titlesSplitter = []
    }

    await nextTick()

    $titles.value?.forEach((title, idx) => {
      const titleSplitter = new TextSplitter(title, {
        splitTypeTypes: 'lines,words',
      })
      titlesSplitter.push(titleSplitter)

      if (idx === 0) {
        return
      }

      gsap.set(title.querySelectorAll('.word'), { y: '100%' })
    })
  }

  const animateSections = () => {
    const currentIndex = activePage.value - 1
    const prevIndex = prevPage.value - 1

    const elements = {
      current: {
        bg: $bgs.value[currentIndex],
        item: $images.value[currentIndex],
        title: $titles.value[currentIndex],
      },
      prev: {
        bg: $bgs.value[prevIndex],
        item: $images.value[prevIndex],
        title: $titles.value[prevIndex],
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

    animateWordExit(prevTitleWords, isForward, textDuration, 0)
    animateWords(curTitleWords, isForward, textDuration, 0)
  }

  watch(activePage, animateSections)

  onMounted(() => {
    $bgs.value = target.value?.querySelectorAll(
      '[data-f-bg]'
    ) as NodeListOf<HTMLElement>

    $images.value = target.value?.querySelectorAll(
      '[data-f-img]'
    ) as NodeListOf<HTMLElement>

    $titles.value = target.value?.querySelectorAll(
      '[data-f-title]'
    ) as NodeListOf<HTMLElement>

    setupInitialStates()
  })

  return {
    activePage,
    prevPage,
    direction,
  }
}
