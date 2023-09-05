import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '~pages'
import '../assets/base.scss'
import App from './app.vue'
import './index.scss'

routes.push({
  path: '/',
  redirect: '/popup',
})

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    return next('/popup')
  }

  next()
})

createApp(App).use(router).mount('#app')
