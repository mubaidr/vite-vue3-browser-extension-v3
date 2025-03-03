<script setup lang="ts">
const router = useRouter()
const { isAuthenticated, userProfile } = useAuth()

if (!isAuthenticated) {
  router.push("/common/account/signin")
}
</script>

<template>
  <div>
    <template v-if="isAuthenticated && userProfile">
      <h1>{{ userProfile.email }}</h1>
      <hr />

      <UserSignOut />
    </template>
  </div>
</template>

<style scoped></style>
