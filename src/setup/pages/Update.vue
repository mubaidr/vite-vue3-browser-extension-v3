<script setup lang="ts">

const displayName = __DISPLAY_NAME__;
const version = __VERSION__;

</script>

<template>
    <div class="w-full h-full flex flex-col gap-y-4 justify-center items-center">
        <h1 class="text-4xl font-bold">🎉 Updated! 🎉</h1>
        <p class="text-lg">{{ displayName }} has been updated to the latest version. 🎉</p>
        <p class="text-lg">Version: {{ version }}</p>
    </div>
</template>

<style lang="scss" scoped></style>