export const useAppState = () => {
  const isInEditor = computed(() => Boolean(useRoute().query._storyblok))
  const isLoaded = useState('inLoaded', () => false)
  const isWaiting = useState('isWaiting', () => false)
  const isMenuOpened = useState('isMenuOpened', () => false)
  const isModalOpened = useState('isModalOpened', () => false)

  return { isInEditor, isLoaded, isWaiting, isMenuOpened, isModalOpened }
}
