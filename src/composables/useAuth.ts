export interface AuthResult {
  token: string
  user: chrome.identity.ProfileUserInfo
}

// Note: implement this in your backend
const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT || ""

export function useAuth() {
  const { data: accessToken } = useBrowserLocalStorage<string | null>(
    "auth_token",
    null,
  )
  const { data: userProfile } =
    useBrowserLocalStorage<chrome.identity.ProfileUserInfo | null>(
      "user_profile",
      null,
    )

  async function signInWithGoogle() {
    try {
      const authTokenResult = await chrome.identity.getAuthToken({
        interactive: true,
      })

      // @ts-expect-error missing runtime.lastError type in chrome-types
      if (chrome.runtime.lastError) {
        // @ts-expect-error missing runtime.lastError type in chrome-types
        throw new Error(chrome.runtime.lastError | "Unknown error")
      }

      if (!authTokenResult.token) {
        throw new Error("Unknown error")
      }

      const profileInfoResult = await chrome.identity.getProfileUserInfo({
        accountStatus: "ANY",
      })

      accessToken.value = authTokenResult.token
      userProfile.value = profileInfoResult
    } catch (err) {
      accessToken.value = null
      userProfile.value = null
      console.info(err)
      throw err
    }
  }

  async function signInWithCredentials(email: string, password: string) {
    try {
      const authTokenResult = (await fetch(BACKEND_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((response) => response.json())) as AuthResult

      accessToken.value = authTokenResult.token
      userProfile.value = authTokenResult.user
    } catch (err) {
      accessToken.value = null
      userProfile.value = null
      console.info(err)
      throw err
    }
  }

  async function resetPassword(email: string) {
    try {
      await fetch(BACKEND_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
    } catch (err) {
      console.info(err)
      throw err
    }
  }

  async function signOut() {
    try {
      await chrome.identity.clearAllCachedAuthTokens()
      await fetch(BACKEND_ENDPOINT, {
        method: "POST",
      })
    } catch (err) {
      console.info(err)
    } finally {
      accessToken.value = null
      userProfile.value = null
    }
  }

  return {
    isAuthenticated: computed(() => !!accessToken.value),
    accessToken,
    userProfile,
    signInWithGoogle,
    signInWithCredentials,
    resetPassword,
    signOut,
  }
}
