import { i18n } from "@/utils/i18n"
import { notivue } from "@/utils/notifications"
import { pinia } from "@/utils/pinia"
import { createApp } from "vue"
import App from "./app.vue"

const app = createApp(App).use(i18n).use(notivue).use(pinia)

export default app
