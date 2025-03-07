import { i18n } from "@/utils/i18n"
import { notivue } from "@/utils/notifications"
import { pinia } from "@/utils/pinia"
import { router } from "@/utils/router"
import { createApp } from "vue"
import App from "./app.vue"
import "./index.scss"

const app = createApp(App).use(i18n).use(notivue).use(pinia).use(router)

await router.push({
  path: "/options-page",
  replace: true,
})

app.mount("#app")

export default app

self.onerror = function (message, source, lineno, colno, error) {
  console.info("Error: " + message)
  console.info("Source: " + source)
  console.info("Line: " + lineno)
  console.info("Column: " + colno)
  console.info("Error object: " + error)
}
