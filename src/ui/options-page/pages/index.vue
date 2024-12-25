<script setup lang="ts">
const optionsStore = useOptionsStore()
// const { toggleDark } = optionsStore
const { isDark, profile, others } = storeToRefs(optionsStore)
</script>

<template>
  <div
    class="max-w-xl w-full mx-auto rounded-xl md:my-12 p-4 md:p-8 md:border border-base-200 md:shadow-lg bg-base-100"
  >
    <RouterLinkUp />

    <h1>Options</h1>
    <p>
      You can configure various options related to this extension here. These
      options/ settings are peristent, available in all contexts, implemented
      using Pinia and useBrowserStorage composable.
    </p>

    <h3>User Interface</h3>
    <p>Change application interface settings.</p>

    <div class="form-control">
      <label>Enabel Dark Theme</label>
      <input
        v-model="isDark"
        type="checkbox"
        class="toggle"
      />
    </div>

    <div class="form-control">
      <label>Change Language</label>
      <LocaleSwitch />
    </div>

    <h3>Profile</h3>
    <p>Change your name and age.</p>

    <div class="form-control">
      <label>Name</label>
      <input
        v-model="profile.name"
        type="text"
      />
    </div>

    <div class="form-control">
      <label>Age</label>
      <input
        v-model="profile.age"
        type="number"
      />
    </div>

    <h3>Others</h3>
    <p>Some other settings related to extension usage.</p>

    <div class="form-control">
      <label>Enable Awesome Feature</label>
      <input
        v-model="others.awesome"
        type="checkbox"
        class="checkbox"
      />
    </div>

    <div class="form-control">
      <label>Some Counter</label>
      <input
        v-model="others.counter"
        type="number"
      />
    </div>

    <p>
      * You can also make this a compoenent and then able to use this in any
      context like Popup, Developer Tools UI etc
    </p>
    <p>
      Feel free to change groups, lsitings or options as per your requirements.
    </p>
  </div>
</template>
