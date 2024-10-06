<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const params = useUrlSearchParams('history')
const setupType = ref<'install' | 'update'>('install')

onMounted(() => {
  const type = params.type as string
  if (type === 'install' || type === 'update') {
    setupType.value = type
  }
  updateTitle()
})

function updateTitle() {
  if (setupType.value === 'install') {
    document.title = `${__DISPLAY_NAME__} | Installed!`
  } else if (setupType.value === 'update') {
    document.title = `${__DISPLAY_NAME__} | Updated!`
  } else {
    document.title = __DISPLAY_NAME__
  }
}

const InstallComponent = defineAsyncComponent(
  () => import('@/components/install.vue')
)
const UpdateComponent = defineAsyncComponent(
  () => import('@/components/update.vue')
)

const ComponentToRender = computed(() => {
  if (setupType.value === 'update') {
    return UpdateComponent
  }
  return InstallComponent
})
</script>

<template>
  <div class="p-10 flex flex-col flex-1 justify-center">
    <div class="flex flex-col items-center">
      <component :is="ComponentToRender" />
    </div>
  </div>
</template>

<style lang="scss"></style>
