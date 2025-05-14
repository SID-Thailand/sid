export const useThankyouScreen = () => {
  const isShowThankYou = useState('isShowThankYou', () => false)

  const hideThankYou = (delay = 2000) => {
    setTimeout(() => {
      isShowThankYou.value = false
    }, delay)
  }

  const showThankYou = (hideDelay?: number) => {
    isShowThankYou.value = true

    hideThankYou(hideDelay)
  }

  return {
    isShowThankYou,
    showThankYou,
    hideThankYou,
  }
}
