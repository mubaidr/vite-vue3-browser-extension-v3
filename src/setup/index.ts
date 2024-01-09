import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import '@/assets/base.scss'
import App from './App.vue'

export interface ISetup {
  setupType: 'install' | 'update'
}

const setupType = new URLSearchParams(window.location.search).get('type')

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
})

router.beforeEach((to, _from, next) => {
  if (to.path === '/') {
    if (setupType === 'install') {
      return next('/install')
    } else if (setupType === 'update') {
      return next('/update')
    }
  }

  next()
})

const app = createApp(App)

app.provide('setupType', { setupType } as ISetup)

app.use(router).mount('#app')

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
