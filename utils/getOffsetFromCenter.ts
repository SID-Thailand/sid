function getOffsetFromCenter(el: HTMLElement) {
  const rect = el.getBoundingClientRect()

  const screenCenterX = window.innerWidth / 2
  const screenCenterY = window.innerHeight / 2

  const elementCenterX = rect.left + rect.width / 2
  const elementCenterY = rect.top + rect.height / 2

  const offsetX = screenCenterX - elementCenterX
  const offsetY = screenCenterY - elementCenterY

  return { offsetX, offsetY }
}

export default getOffsetFromCenter
