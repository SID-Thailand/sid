export const useAppState = () => {
  const isInEditor = computed(() => Boolean(useRoute().query._storyblok))
  const isLoaded = useState('inLoaded', () => false)
  const isWaiting = useState('isWaiting', () => false)
  const isMenuOpened = useState('isMenuOpened', () => false)
  const isModalOpened = useState('isModalOpened', () => false)
  const isUseLoader = useState('isUseLoader', () => true)

  return {
    isInEditor,
    isLoaded,
    isWaiting,
    isMenuOpened,
    isModalOpened,
    isUseLoader,
  }
}
