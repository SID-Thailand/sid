export const useHeaderColor = () => {
  const headerColor = useState<'white' | 'black'>('headerColor', () => 'white')

  const setHeaderColor = (color: 'white' | 'black') => {
    headerColor.value = color
  }

  return {
    headerColor,
    setHeaderColor,
  }
}
