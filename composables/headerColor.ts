export const useHeaderColor = () => {
  const $headerRef = useState<HTMLElement | null>('$headerRef', () => null)
  const headerColor = useState<'white' | 'black'>('headerColor', () => 'white')

  const setHeaderColor = (color: 'white' | 'black') => {
    headerColor.value = color
  }

  return {
    $headerRef,
    headerColor,
    setHeaderColor,
  }
}
