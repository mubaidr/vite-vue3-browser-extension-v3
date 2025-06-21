import { i18n } from "src/utils/i18n"
import { pinia } from "src/utils/pinia"
import { appRouter } from "src/utils/router"
import { createApp } from "vue"
import App from "./app.vue"
import ui from "@nuxt/ui/vue-plugin"
import "./index.css"

appRouter.addRoute({
  path: "/",
  alias: "/setup",
  redirect: (to) => {
    // If ?type=update, redirect to update page, else to install
    if (to.query.type === "update") {
      return "/setup/update"
    }

    return "/setup/install"
  },
})

const app = createApp(App).use(i18n).use(ui).use(pinia).use(appRouter)

app.mount("#app")

export default app

self.onerror = function (message, source, lineno, colno, error) {
  console.info("Error: " + message)
  console.info("Source: " + source)
  console.info("Line: " + lineno)
  console.info("Column: " + colno)
  console.info("Error object: " + error)
}
