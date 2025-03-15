<script setup lang="ts">
const displayName = __DISPLAY_NAME__
// const version = __VERSION__
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-center items-center text-center md:my-12"
  >
    <UButton>Button</UButton>
    <h1>🎉 Installed! 🚀</h1>
    <p>
      Thank you for installing {{ displayName }}! ❤️
      <br />
      Now you can close this tab and start using the extension.
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
