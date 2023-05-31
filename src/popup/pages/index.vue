<script setup lang="ts">
// chrome.identity.launchWebAuthFlow(
//   {
//     interactive: true,
//     url:
//       `https://github.com/login/oauth/authorize` +
//       `?client_id=55e294602d71eb006dc505540cf0614d6b3c7f35` +
//       `&redirect_uri=https://ekgmcbpgglflmgcfajnglpbcbdccnnje.chromiumapp.org/github_cb` +
//       `&scope=user.email`,
//   },
//   (a) => {
//     console.log(a)
//   }
// )
</script>

<template>
  <div class="text-center m-4">
    <h1 class="text-3xl font-bold underline pb-6">Hello world from Popup!</h1>

    <RouterLink to="/about">About</RouterLink>
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
