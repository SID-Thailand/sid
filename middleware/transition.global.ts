import { projectTransition } from '~/transitions/project'
import { pageTransition } from '~/transitions/base'
import { useRouteHistory } from '~/composables/routeHistory'

export default defineNuxtRouteMiddleware((to, from) => {
  const { prevRoute, currentRoute } = useRouteHistory()

  prevRoute.value = String(from.name)
  currentRoute.value = String(to.name)

  const isProjectTransition = from.meta.isProjectTransition

  const projectTemplates = [
    'projects-id',
    'consultancy-projects-id',
    'landing-id',
  ]

  if (isProjectTransition && projectTemplates.includes(String(to.name))) {
    to.meta.pageTransition = projectTransition
    from.meta.pageTransition = projectTransition

    return
  }

  to.meta.pageTransition = pageTransition
  from.meta.pageTransition = pageTransition
})
