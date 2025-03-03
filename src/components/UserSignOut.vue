<script setup lang="ts">
const router = useRouter()
const { isAuthenticated, signOut, userProfile } = useAuth()

const loading = ref(false)

async function signOutAllAccounts() {
  loading.value = true

  try {
    if (!isAuthenticated) {
      return
    }

    await signOut()
    pushNotification.success({
      message: "Signed out successfully",
    })
    router.push("/")
  } catch (err) {
    console.error(err)
    pushNotification.error({
      message: err as string,
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <template v-if="isAuthenticated">
      <div class="dropdown">
        <div
          tabindex="0"
          role="button"
        >
          {{ userProfile?.email }}
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <button
              class="btn btn-outline btn-error"
              @click="signOutAllAccounts"
            >
              <span
                v-if="loading"
                class="loading loading-spinner"
              ></span>
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <RouterLink to="/common/auth/signin">Sign In</RouterLink>
    </template>
  </div>
</template>

<style scoped></style>
