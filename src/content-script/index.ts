import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import packageJson from '../../package.json'
import App from './app.vue'
import routes from '~pages'
import '../assets/base.scss'
import './index.scss'

const { version, name } = packageJson

routes.push({
  path: '/',
  redirect: '/content-script',
})

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

const app = createApp(App).use(router)

// console.log(router.getRoutes())

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}

// mount app using shadow dom
const shadowRoot = document.createElement('div')
shadowRoot.id = `${name}-${version}-shadow-root`
document.body.appendChild(shadowRoot)
app.mount(shadowRoot)
