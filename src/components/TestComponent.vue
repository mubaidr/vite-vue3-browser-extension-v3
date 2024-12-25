<script setup lang="ts">
const testStore = useTestStore()
const { increment, decrement } = testStore
const { count, name } = storeToRefs(testStore)
</script>

<template>
  <div>
    <ul>
      <li>This is a simple example showing Vue.js and DaisyUI.</li>
      <li>You can access relevant chrome apis here.</li>
    </ul>

    <!-- Counter Component -->
    <div class="text-center">
      <div>
        <div class="text-lg font-semibold mb-4">Name: {{ name }}</div>
        <input
          v-model="name"
          type="text"
          class="input input-primary"
        />
      </div>
      <br />
      <div class="text-lg font-semibold mb-4">Count: {{ count }}</div>
      <div class="flex gap-2 justify-center">
        <button
          class="btn btn-primary"
          @click="decrement"
        >
          <i-ph-minus />
          Decrement
        </button>
        <button
          class="btn btn-primary"
          @click="increment"
        >
          <i-ph-plus />
          Increment
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
