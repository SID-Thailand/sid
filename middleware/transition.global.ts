import { pageTransition } from '~/transitions/base'

export default defineNuxtRouteMiddleware((to, from) => {
  to.meta.pageTransition = pageTransition
  from.meta.pageTransition = pageTransition
})
