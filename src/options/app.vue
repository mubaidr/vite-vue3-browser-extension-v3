<script setup lang="ts">
import { Notification, Notivue } from 'notivue'
import { useAppStore } from '@/stores/app.store'

const store = useAppStore()

const count = computed(() => store.count)
</script>

<template>
  <header
    aria-label="Site Header"
    class="bg-gray-50"
  >
    Options Header
  </header>

  <RouterView />

  <p>Count: {{ count }}</p>

  <footer
    aria-label="Site Footer"
    class="bg-gray-50"
  >
    Options Footer
  </footer>

  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
</template>

<style scoped></style>
