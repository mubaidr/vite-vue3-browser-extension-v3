<script setup lang="ts">
import { Notivue, Notification } from "notivue"
</script>

<template>
  <UApp>
    <AppHeader />

    <div class="w-full p-4 prose">
      <RouterView />
    </div>

    <AppFooter />

    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </UApp>
</template>

<style lang="scss"></style>
