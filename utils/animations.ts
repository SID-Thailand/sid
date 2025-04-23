interface IScaleIn {
  tl: GSAPTimeline
  el: HTMLElement
  offset?: number
}

interface IScaleOut {
  tl: GSAPTimeline
  el: HTMLElement
  inset: string
  offset?: number
}

export const scaleIn = ({ tl, el, offset = 0 }: IScaleIn) =>
  tl.to(el, { scale: 1, clipPath: 'inset(0% 0 0 0)' }, offset)

export const scaleOut = ({ tl, el, inset, offset = 0 }: IScaleOut) =>
  tl.to(el, { scale: 1.3, clipPath: `inset(${inset})` }, offset)

interface IFade {
  tl: GSAPTimeline
  el: HTMLElement
  offset?: number
}

export const fadeIn = ({ tl, el, offset = 0 }: IFade) => {
  if (!el) return
  tl.to(el, { opacity: 1, duration: 0.2, overwrite: true }, offset)
}

export const fadeOut = ({ tl, el, offset = 0 }: IFade) => {
  if (!el) return
  tl.to(el, { opacity: 0, duration: 0.2 }, offset)
}
