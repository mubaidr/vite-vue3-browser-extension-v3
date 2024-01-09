<script setup lang="ts">
import { RouterView } from 'vue-router';
import { inject, watchEffect } from 'vue';

import { ISetup } from './index'

const setup = inject<ISetup>('setupType');

watchEffect(() => {
    if (setup) {
        if (setup.setupType === 'install') {
            document.title = `${__DISPLAY_NAME__} | Installed!`;
        } else if (setup.setupType === 'update') {
            document.title = `${__DISPLAY_NAME__} | Updated!`;
        }
    } else {
        document.title = __DISPLAY_NAME__;
    }
});
</script>

<template>
    <RouterView />
</template>

<style lang="scss">
html,
body,
#app {
    @apply w-full h-full flex flex-col justify-center items-center;
}
</style>