<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import { i18n } from '@/utils/i18n'

const currentLocale = useLocale()
</script>

<template>
  <div>
    <div class="dropdown">
      <div
        tabindex="0"
        role="button"
        class="flex gap-1"
      >
        <i-ph-globe />
        {{ currentLocale }}
      </div>
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-100 rounded-box z-[1] shadow-lg -ml-4 mt-4"
      >
        <li
          v-for="locale in i18n.global.availableLocales"
          :key="`locale-${locale}`"
        >
          <button
            class="text-primary px-4"
            @click="currentLocale = locale"
          >
            {{ locale }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
