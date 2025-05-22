export const useAppState = () => {
  const isInEditor = computed(() => Boolean(useRoute().query._storyblok))
  const isLoaded = useState('inLoaded', () => false)
  const isWaiting = useState('isWaiting', () => false)
  const isMenuOpened = useState('isMenuOpened', () => false)
  const isSlideModalOpened = useState('isSlideModalOpened', () => false)
  const isFormModalOpened = useState('isFormModalOpened', () => false)
  const formModalFrom = useState('formModalFrom', () => '')
  // const isUseLoader = useState(
  //   'isUseLoader',
  //   () => config.public.ENVIROMENT === 'production'
  // )

  const isUseLoader = useState('isUseLoader', () => true)

  const isFullPage = useState('isFullPage', () => false)

  const openFormModal = async (from: string) => {
    formModalFrom.value = from
    await nextTick()
    isFormModalOpened.value = true
  }

  watch(isFormModalOpened, val => {
    if (!val) {
      formModalFrom.value = ''
    }
  })

  return {
    isInEditor,
    isLoaded,
    isWaiting,
    isMenuOpened,
    isFormModalOpened,
    openFormModal,
    formModalFrom,
    isSlideModalOpened,
    isUseLoader,
    isFullPage,
  }
}
