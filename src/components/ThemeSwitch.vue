<script lang="ts" setup>
const { isDark, toggleDark } = useTheme()
applyTheme(isDark ? "dark" : "light")
</script>

<template>
  <UButton
    :icon="isDark ? 'lucide:moon' : 'lucide:sun'"
    variant="ghost"
    @click="toggleDark"
  />
</template>
