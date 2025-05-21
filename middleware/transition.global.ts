import { projectTransition } from '~/transitions/project'
import { pageTransition } from '~/transitions/base'
import { useRouteHistory } from '~/composables/routeHistory'

export default defineNuxtRouteMiddleware((to, from) => {
  const { prevRoute, currentRoute } = useRouteHistory()

  prevRoute.value = String(from.name)
  currentRoute.value = String(to.name)

  const isProjectTransition = from.meta.isProjectTransition

  if (
    isProjectTransition &&
    (to.name === 'projects-id' || to.name === 'consultancy-projects-id')
  ) {
    to.meta.pageTransition = projectTransition
    from.meta.pageTransition = projectTransition

    return
  }

  to.meta.pageTransition = pageTransition
  from.meta.pageTransition = pageTransition
})
