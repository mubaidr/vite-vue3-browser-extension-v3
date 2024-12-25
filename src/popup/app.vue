<script setup lang="ts">
import { Notification, Notivue } from 'notivue'
</script>

<template>
  <header
    aria-label="Site Header"
    class="bg-gray-50"
  >
    Popup Header
  </header>

  <RouterView />

  <footer
    aria-label="Site Footer"
    class="bg-gray-50"
  >
    Popup Footer
  </footer>

  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
</template>

<style scoped></style>
