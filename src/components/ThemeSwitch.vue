<script lang="ts" setup>
const { isDark, toggleDark } = useTheme()
</script>

<template>
  <button
    class="btn-ghost text-primary"
    @click="toggleDark()"
  >
    <template v-if="isDark">
      <i-ph-moon />
    </template>
    <template v-else>
      <i-ph-sun />
    </template>
    Theme
  </button>
</template>
