<script setup lang="ts">
const testStore = useTestStore()
const { increment, decrement } = testStore
const { count, name } = storeToRefs(testStore)
</script>

<template>
  <div>
    <!-- Counter Component -->
    <div class="text-center">
      <div>
        <div class="text-lg font-semibold mb-4">Name: {{ name }}</div>
        <UInput
          v-model="name"
          type="text"
        />
      </div>
      <br />
      <div class="text-lg font-semibold mb-4">Count: {{ count }}</div>
      <div class="flex gap-2 justify-center">
        <UButton
          icon="ph:minus"
          @click="decrement"
        >
          Decrement
        </UButton>
        <UButton
          icon="ph:plus"
          @click="increment"
        >
          Increment
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
