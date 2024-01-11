import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
  const count = useStorage('count', 0)
  const name = useStorage('name', 'John Doe')

  // You should probably use chrome.storage API instead of localStorage since localStorage history can be cleared by the user.
  // See https://developer.chrome.com/docs/extensions/reference/api/storage

  const increment = () => {
    count.value++
  }

  const decrement = () => {
    count.value--
  }

  return {
    count,
    name,
    increment,
    decrement,
  }
})
