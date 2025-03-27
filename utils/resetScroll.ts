export const resetScroll = () => {
  if (window.escroll) {
    try {
      window.escroll.reset()
    } catch (e) {
      console.log(e)
    }
  }
  window.escroll && (window.escroll.disabled = false)
}
