<script setup lang="ts"></script>

<template>
  <div>
    <div class="hero">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1>Welcome!</h1>
          <p>
            Unlock productivity and streamline your workflow with our SaaS
            Chrome extension platform.
          </p>

          <div class="flex gap-2 justify-center mb-4">
            <UButton
              to="/common/features"
              icon="ph:list-heart"
              variant="subtle"
            >
              Features
            </UButton>
            <UButton
              to="/common/pricing"
              icon="ph:presentation-chart"
              variant="subtle"
            >
              Features
            </UButton>
          </div>

          <UButton
            to="/common/account/login"
            icon="ph:rocket-launch"
            size="xl"
          >
            Get Started Now
          </UButton>

          <div class="flex justify-evenly my-6">
            <RouterLink to="/action-popup/playground">Playground</RouterLink>

            <a href="https://github.com/mubaidr/vite-vue3-browser-extension-v3">
              Documentation
            </a>

            <a href="https://mubaidr.js.org">Support</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
