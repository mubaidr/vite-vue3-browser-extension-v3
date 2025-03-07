import { NavigationGuardNext, RouteLocationNormalized } from "vue-router"

export async function middleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const { isAuthenticated, userProfile } = useAuth()
  const auth = to.meta.auth

  if (auth === false) {
    return next()
  }

  if (auth === undefined) {
    return next()
  }

  if (auth === null) {
    return next()
  }

  if (auth === true) {
    if (isAuthenticated.value && userProfile.value) {
      return next()
    } else {
      return next({
        path: "/common/auth/signin",
        query: {
          redirect: to.path,
        },
      })
    }
  }

  // advance config
  const { unauthenticatedOnly, navigateAuthenticatedTo } = auth

  if (unauthenticatedOnly) {
    if (isAuthenticated.value && userProfile.value) {
      return next(navigateAuthenticatedTo)
    }

    return next()
  }
}
