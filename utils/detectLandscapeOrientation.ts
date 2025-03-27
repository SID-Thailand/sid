import { resize } from '@emotionagency/utils'

function supportsOrientationChange(): boolean {
  return 'onorientationchange' in window
}

function getWindowOrientation(): number {
  return window.orientation
}

function handlePortraitMode(): void {
  document.body.classList.remove('landscape')
}

function handleLandscapeMode(): void {
  document.body.classList.add('landscape')
}

function handleUpsideDownPortraitMode(): void {
  document.body.classList.add('landscape')
}

function handleOrientationChange(): void {
  console.log('change')

  const orientation = getWindowOrientation()

  switch (orientation) {
    case 0:
      handlePortraitMode()
      break
    case 90:
    case -90:
      handleLandscapeMode()
      break
    case 180:
      handleUpsideDownPortraitMode()
      break
    default:
      break
  }
}

export function detectOrientationChanges(): void {
  if (supportsOrientationChange()) {
    resize.on(handleOrientationChange)
  }
}
