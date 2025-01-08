import { ref, watch } from "vue"
export function useBrowserSyncStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue)
  // Initialize storage with the value from chrome.storage.sync
  chrome.storage.sync.get(key, (result) => {
    if (
      result?.[key] != undefined &&
      typeof result[key] === typeof defaultValue
    ) {
      data.value = result[key]
    }
  })

  // Watch for changes in the storage and update chrome.storage.sync
  watch(
    data,
    (newValue) => {
      chrome.storage.sync.set({ [key]: toRaw(newValue) })
    },
    { deep: true },
  )
  return data
}

export function useBrowserLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue)
  // Initialize storage with the value from chrome.storage.local
  chrome.storage.local.get(key, (result) => {
    if (
      result?.[key] != undefined &&
      typeof result[key] === typeof defaultValue
    ) {
      data.value = result[key]
    }
  })

  // Watch for changes in the storage and update chrome.storage.local
  watch(
    data,
    (newValue) => {
      chrome.storage.local.set({ [key]: toRaw(newValue) })
    },
    { deep: true },
  )
  return data
}
