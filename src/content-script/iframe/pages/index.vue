<script setup lang="ts">
function handleClick() {
  console.log(chrome.runtime)
  alert('chrome.runtime is available in content script')
}
</script>

<template>
  <div>
    <h1 class="text-red-800 font-bold text-xl">
      Content Script Iframe
    </h1>
    <button
      class="btn btn-primary"
      @click="handleClick"
    >
      Sample Daisy UI Button
    </button>
  </div>
</template>

<style scoped></style>
