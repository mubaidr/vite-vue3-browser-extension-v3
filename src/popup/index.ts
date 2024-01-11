import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { createPinia } from 'pinia'
import '@/assets/base.scss'
import App from './App.vue'
import './index.scss'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
})

createApp(App).use(router).use(createPinia()).mount('#app')

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
