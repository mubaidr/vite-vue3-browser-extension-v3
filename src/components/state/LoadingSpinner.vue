<template>
  <div
    v-if="loading"
    class="flex items-center justify-center"
  >
    <span class="loading loading-spinner text-primary" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
}>()
</script>
