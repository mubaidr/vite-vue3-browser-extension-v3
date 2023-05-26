import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import '../assets/base.css'
import App from './app.vue'
import './index.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.beforeEach((to) => {
//   if (to.path === '/index.html') return '/'
// })

createApp(App).use(router).mount('#app')
