import { resetScroll } from '../utils/resetScroll'

interface IBasicObject {
  mode: 'out-in' | 'in-out' | 'default'
  css: boolean
  appear: boolean
  onEnter: () => void
  onLeave: () => void
}

export const basicObject: IBasicObject = {
  mode: 'out-in',
  css: false,
  appear: true,
  onEnter() {
    resetScroll()
  },
  onLeave() {
    window.escroll && (window.escroll.disabled = true)
  },
}
