import { gsap } from '~/libs/gsap'

export const getWords = (selector: HTMLElement | null) =>
  selector?.querySelectorAll(`.word`) ?? []

export const animateWords = (
  words: NodeListOf<Element> | any[],
  isForward: boolean,
  time: number,
  offset = 0
) => {
  if (!words.length) return

  const y = isForward ? '130%' : '-130%'

  gsap.fromTo(words, { y }, { y: '0%', duration: time, delay: offset })
}

export const animateWordExit = (
  words: NodeListOf<Element> | any[],
  isForward: boolean,
  time: number,
  offset = 0
) => {
  if (!words.length) return

  const y = isForward ? '-130%' : '130%'

  gsap.to(words, { y, duration: time, delay: offset })
}
