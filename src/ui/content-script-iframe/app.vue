<script setup lang="ts">
import { Notivue, Notification } from 'notivue'
</script>

<template>
  <UApp>
    <AppHeader />

    <div class="p-4 prose">
      <RouterView />
    </div>

    <AppFooter />

    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </UApp>
</template>

<style scoped></style>
