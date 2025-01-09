import { ref, watch } from "vue"
function mergeDeep(defaults: any, source: any): any {
  // Merge the default options with the stored options
  const output = { ...defaults } // Start with defaults

  Object.keys(defaults).forEach((key) => {
    if (isObject(defaults[key]) && source?.[key] != null) {
      // Recursively merge nested objects
      output[key] = mergeDeep(defaults[key], source[key])
    } else if (checkType(defaults[key], source?.[key])) {
      output[key] = source[key]
    } else {
      // If the type is different, use the default value
      output[key] = defaults[key]
    }
  })

  return output
}

function checkType(defaultValue: any, value: any): boolean {
  // Check if the value type is the same type as the default value or null
  // there are only strings, booleans, nulls and arrays as types left
  return (
    (typeof value === typeof defaultValue &&
      Array.isArray(value) == Array.isArray(defaultValue)) ||
    value === null
  )
}
function isObject(value: any): boolean {
  return value !== null && value instanceof Object && !Array.isArray(value)
}

export function useBrowserSyncStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue)
  // Initialize storage with the value from chrome.storage.sync
  chrome.storage.sync.get(key, (result) => {
    if (result?.[key] !== undefined) {
      if (isObject(defaultValue) && isObject(result[key])) {
        data.value = mergeDeep(defaultValue, result[key])
      } else if (checkType(defaultValue, result[key])) {
        data.value = result[key]
      }
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
    if (result?.[key] !== undefined) {
      if (isObject(defaultValue) && isObject(result[key])) {
        data.value = mergeDeep(defaultValue, result[key])
      } else if (checkType(defaultValue, result[key])) {
        data.value = result[key]
      }
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
