import "vue-router"
import { RouteNamedMap } from "vue-router/auto-routes"

export {}

declare module "vue-router" {
  interface RouteMeta {
    auth:
      | undefined
      | boolean
      | {
          unauthenticatedOnly: true
          navigateAuthenticatedTo: keyof RouteNamedMap | "/"
        }
  }
}
