import { createRouter, createWebHashHistory } from "vue-router"
import { handleHotUpdate, routes } from "vue-router/auto-routes"
import { middleware } from "./middleware"

routes.push({
  path: "/:catchAll(.*)*",
  redirect: "/",
})

export const appRouter = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

appRouter.beforeEach(middleware)

if (import.meta.hot) {
  handleHotUpdate(appRouter)
}

// TOFIX: vue-router export naming without underscore
