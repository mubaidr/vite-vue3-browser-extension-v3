import { createRouter, createMemoryHistory } from "vue-router"
import { middleware } from "./middleware"
import routes from "~pages"

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach(middleware)
