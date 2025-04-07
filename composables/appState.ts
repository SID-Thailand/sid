export const useAppState = () => {
  const isInEditor = useState('inEditor', () => false)
  const isLoaded = useState('inLoaded', () => false)
  const isWaiting = useState('isWaiting', () => false)
  const isMenuOpened = useState('isMenuOpened', () => false)
  const isModalOpened = useState('isModalOpened', () => false)

  return { isInEditor, isLoaded, isWaiting, isMenuOpened, isModalOpened }
}
