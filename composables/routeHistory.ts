export const useRouteHistory = () => {
  const prevRoute = useState('prevRoute', () => '')
  const currentRoute = useState('currentRoute', () => '')
  const isProjectTransition = useState('isProjectTransition', () => false)

  return { prevRoute, currentRoute, isProjectTransition }
}
