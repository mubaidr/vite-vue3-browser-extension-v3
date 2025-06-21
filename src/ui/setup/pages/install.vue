<script setup lang="ts">
const displayName = __DISPLAY_NAME__
// const version = __VERSION__
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-center items-center text-center md:my-12"
  >
    <h1>🎉 Installed! 🚀</h1>
    <p>
      Thank you for installing {{ displayName }}! ❤️
      <br />
      Now you can close this tab and start using the extension.
    </p>
  </div>

  <hr />
  <h2>App Routes:</h2>
  <div class="flex flex-wrap gap-2">
    <RouterLink
      v-for="route in appRouter.getRoutes()"
      :key="route.path"
      :to="route.path"
      class="btn"
    >
      {{ route.path }}
    </RouterLink>
  </div>

  <hr />
</template>

<style lang="css" scoped></style>
