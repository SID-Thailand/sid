import type EmotionScroll from '@emotionagency/emotion-scroll'

export {}

declare global {
  interface Window {
    escroll: typeof EmotionScroll.prototype
    ym?: (
      counterId: number,
      method: 'getClientID',
      callback: (clientId: string) => void
    ) => void
  }
}
