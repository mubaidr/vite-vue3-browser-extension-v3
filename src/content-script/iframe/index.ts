import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import '../../assets/base.scss'
import App from './app.vue'
import './index.scss'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    return next('/iframe')
  }

  next()
})

console.log(router.getRoutes())

createApp(App).use(router).mount('#app')
