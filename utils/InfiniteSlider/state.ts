export const state = {
  min: 0,
  max: 0,
  posX: 0,
  targetX: 0,
  velocity: 0,
  smoothVelocity: 0,
  isMoving: false,
  activeSlide: 0,
  disabled: false,
}

export const resetState = () => {
  state.min = 0
  state.max = 0
  state.posX = 0
  state.targetX = 0
  state.velocity = 0
  state.smoothVelocity = 0
  state.isMoving = false
  state.activeSlide = 0
  state.disabled = false
}
