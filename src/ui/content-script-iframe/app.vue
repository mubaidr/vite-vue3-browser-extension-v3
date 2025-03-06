<script setup lang="ts">
import { Notivue, Notification } from "notivue"
</script>

<template>
  <div>
    <AppHeader />

    <div class="p-4 prose">
      <h1>Content Script</h1>
      <p>This is where content script details will be displayed.</p>
    </div>

    <AppFooter />

    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </div>
</template>

<style scoped></style>
