<script setup lang="ts"></script>

<template>
  <div class="text-center m-4">
    <h1 class="text-3xl font-bold underline pb-6">Hello world from Options!</h1>

    <RouterLink to="/common/about">About</RouterLink>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
