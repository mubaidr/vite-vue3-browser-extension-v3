<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
router.push({ path: 'popup' })

</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
