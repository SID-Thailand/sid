export const useAppState = () => {
  const isInEditor = computed(() => Boolean(useRoute().query._storyblok))
  const isLoaded = useState('inLoaded', () => false)
  const isWaiting = useState('isWaiting', () => false)
  const isMenuOpened = useState('isMenuOpened', () => false)
  const isSlideModalOpened = useState('isSlideModalOpened', () => false)
  const isFormModalOpened = useState('isFormModalOpened', () => false)
  const isUseLoader = useState('isUseLoader', () => false)

  return {
    isInEditor,
    isLoaded,
    isWaiting,
    isMenuOpened,
    isFormModalOpened,
    isSlideModalOpened,
    isUseLoader,
  }
}
