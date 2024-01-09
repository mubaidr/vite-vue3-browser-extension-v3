import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAppStore = defineStore('app', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      count: useStorage('count', 0),
      name: useStorage('name', 'John Doe'),
    }
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  },
})
