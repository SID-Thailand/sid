import { gsap } from '~/libs/gsap'
import { TextSplitter } from './../utils/textSplitter'

export const resetSplitters = (
  splitters: (typeof TextSplitter.prototype)[]
) => {
  if (!splitters?.length) return
  splitters.forEach(splitter => {
    splitter.revert()
  })
  splitters = []
}

export const splitTexts = (items: NodeListOf<HTMLElement>) => {
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
