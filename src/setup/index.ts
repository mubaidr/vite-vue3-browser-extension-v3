import '@/assets/base.scss'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import App from './app.vue'
import './index.scss'

export interface ISetup {
  setupType: 'install' | 'update'
}

const setupType = new URLSearchParams(window.location.search).get('type')

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // You don't need to define routes here when using the auto import feature from `unplugin-vue-router`
  // Add routes to `vite.config.ts` instead.
  extendRoutes: (routes) => {
    routes.push({
      path: '/',
      redirect: '/setup',
    })

    return routes
  },
})

router.beforeEach((to, _from, next) => {
  if (to.path === '/' || to.path === '/setup') {
    if (setupType === 'install') {
      return next('/setup/install')
    } else if (setupType === 'update') {
      return next('/setup/update')
    }
  }

  next()
})

const app = createApp(App)

app.provide('setupType', { setupType } as ISetup)

app.use(router).mount('#app')

// console.log(router.getRoutes())

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
