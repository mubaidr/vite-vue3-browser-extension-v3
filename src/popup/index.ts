import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import '../assets/base.css'
import App from './app.vue'
import './index.css'

console.log({ url: import.meta.env.BASE_URL })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.beforeEach((to) => {
//   console.log({ to })

//   if (to.path === '/index.html') return '/'
// })

// router.afterEach((a, b, c) => {
//   console.log({ a, b, c })
// })

createApp(App).use(router).mount('#app')
