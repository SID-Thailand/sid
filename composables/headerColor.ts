export const useHeaderColor = () => {
  const $headerRef = useState<HTMLElement | null>('$headerRef', () => null)
  const headerColor = useState<'white' | 'black'>('headerColor', () => 'white')

  const activeBlackSections = useState<Set<string>>(
    'activeBlackSections',
    () => new Set()
  )

  const updateHeaderColor = () => {
    headerColor.value = activeBlackSections.value.size > 0 ? 'black' : 'white'
  }

  const registerBlackHeaderTrigger = (id: string) => {
    activeBlackSections.value.add(id)
    updateHeaderColor()
  }

  const unregisterBlackHeaderTrigger = (id: string) => {
    activeBlackSections.value.delete(id)
    updateHeaderColor()
  }

  return {
    $headerRef,
    headerColor,
    registerBlackHeaderTrigger,
    unregisterBlackHeaderTrigger,
  }
}
