import { createRouter, createWebHistory } from "vue-router"
import { handleHotUpdate, routes } from "vue-router/auto-routes"

routes.push({
  path: "/:catchAll(.*)*",
  redirect: "/",
})

export const appRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

if (import.meta.hot) {
  handleHotUpdate(appRouter)
}
