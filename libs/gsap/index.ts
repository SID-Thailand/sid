import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2
const RECIPROCAL_GR = 1 / GOLDEN_RATIO
const DURATION = RECIPROCAL_GR

if (globalThis.document) {
  gsap.registerPlugin(Flip, ScrollTrigger)

  gsap.config({
    autoSleep: 60,
    nullTargetWarn: false,
  })

  gsap.defaults({
    duration: DURATION,
    ease: 'power2.out',
  })

  ScrollTrigger.defaults({
    scroller: '#scroll-container',
    pinType: 'fixed',
  })

  gsap.ticker.lagSmoothing(0)
  // ScrollTrigger.normalizeScroll(true)
}

const checkPossibilityToRefrech = () => {
  // @ts-ignore
  if (window.escroll.state.isScrolling) {
    setTimeout(() => {
      checkPossibilityToRefrech()
    }, 100)
  } else {
    ScrollTrigger.refresh()
  }
}

const refreshScrollTrigger = () => {
  if (window.innerWidth < 768) {
    checkPossibilityToRefrech()
  } else {
    ScrollTrigger.refresh()
  }
}

export {
  Flip,
  ScrollTrigger,
  DURATION,
  GOLDEN_RATIO,
  gsap,
  refreshScrollTrigger,
}
