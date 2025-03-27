import type { TransitionProps } from 'vue'

export const pageTransition: TransitionProps = {
  duration: 250,
  mode: 'out-in',
  css: false,
  appear: true,
  onEnter(_, done) {
    done()
  },
  onLeave(_, done) {
    done()
  },
}
