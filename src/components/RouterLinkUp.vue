<script setup lang="ts">
const router = useRouter()

defineProps<{
  label?: string
}>()
</script>

<template>
  <button
    class="btn btn-sm my-4"
    @click="router.back()"
  >
    <i-ph-arrow-left />
    {{ label || 'Go Back' }}
  </button>
</template>

<style scoped></style>
