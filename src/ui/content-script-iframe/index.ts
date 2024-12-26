import { i18n } from "@/utils/i18n"
import { notivue } from "@/utils/notifications"
import { pinia } from "@/utils/pinia"
import { appRouter } from "@/utils/router"
import { createApp } from "vue"
import App from "./app.vue"
import "./index.scss"

appRouter.addRoute({
  path: "/",
  redirect: "/content-script-iframe",
})

const app = createApp(App).use(i18n).use(notivue).use(pinia).use(appRouter)

app.mount("#app")

export default app

self.onerror = function (message, source, lineno, colno, error) {
  console.info("Error: " + message)
  console.info("Source: " + source)
  console.info("Line: " + lineno)
  console.info("Column: " + colno)
  console.info("Error object: " + error)
}
