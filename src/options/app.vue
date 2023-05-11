<script setup lang="ts">
import {useRouter} from 'vue-router';

const router = useRouter()
router.push({path: 'options'})

</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
