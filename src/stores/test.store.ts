export const useTestStore = defineStore('app', () => {
  const count = useBrowserLocalStorage('count', 0)
  const name = useBrowserLocalStorage('name', 'John Doe')

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
