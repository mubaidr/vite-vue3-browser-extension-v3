import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import '../assets/base.scss'
import App from './app.vue'
import './index.scss'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    return next('/options')
  }

  next()
})

createApp(App).use(router).use(createPinia()).mount('#app')

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
