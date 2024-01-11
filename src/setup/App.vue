<script setup lang="ts">
import { RouterView } from 'vue-router'
import { inject, watchEffect } from 'vue'

import { ISetup } from './index'

const setup = inject<ISetup>('setupType')

watchEffect(() => {
  if (setup) {
    if (setup.setupType === 'install') {
      document.title = `${__DISPLAY_NAME__} | Installed!`
    } else if (setup.setupType === 'update') {
      document.title = `${__DISPLAY_NAME__} | Updated!`
    }
  } else {
    document.title = __DISPLAY_NAME__
  }
})
</script>

<template>
  <div class="p-10 flex flex-col flex-1 justify-center">
    <div class="flex flex-col items-center">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss"></style>
