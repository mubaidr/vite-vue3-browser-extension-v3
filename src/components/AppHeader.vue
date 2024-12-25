<script setup lang="ts"></script>

<template>
  <div class="navbar bg-primary text-primary-content p-2">
    <div class="flex-1 pl-2">
      <RouterLink
        to="/"
        class="flex gap-2 items-center"
      >
        <img
          src="@assets/logo.png"
          alt="logo"
          class="h-8 w-auto"
        />
        <div class="text-base font-semibold">Vite Vue 3 Chrome Extension</div>
      </RouterLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal menu-xs">
        <li>
          <RouterLink to="/options-page">
            <i-ph-gear />
          </RouterLink>
        </li>
        <li>
          <LocaleSwitch />
        </li>
        <li>
          <div class="dropdown dropdown-bottom dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="flex gap-1"
            >
              <i-ph-dots-three-vertical />
            </div>
            <ul
              tabindex="0"
              class="dropdown-content menu bg-white rounded-box z-[1] shadow-lg"
            >
              <li><ThemeSwitch /></li>
              <li></li>
              <li>
                <RouterLink
                  to="/common/about"
                  class="text-primary"
                >
                  <i-ph-question />
                  About
                </RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
