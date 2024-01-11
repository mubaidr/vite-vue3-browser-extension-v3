import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import '../../assets/base.scss'
import App from './app.vue'
import './index.scss'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => {
    routes.push({
      path: '/',
      redirect: '/iframe',
    })

    return routes
  },
})

createApp(App).use(router).mount('#app')

// console.log(router.getRoutes())

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
