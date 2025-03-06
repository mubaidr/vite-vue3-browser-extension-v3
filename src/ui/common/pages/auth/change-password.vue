<script setup lang="ts">
definePage({
  meta: {
    auth: true,
  },
})
</script>

<template>
  <div
    class="max-w-xl w-full mx-auto rounded-xl md:my-12 p-4 md:p-8 md:border border-base-200 md:shadow-lg bg-base-100"
  >
    <RouterLinkUp />

    <h2>Change Your Password</h2>
    <p>Please enter your current password and your new password.</p>
  </div>
</template>
