import type { BasicColorSchema } from "@vueuse/core"
import { useBrowserLocalStorage } from "./useBrowserStorage"
import { name } from "~/package.json"

export function applyTheme(mode: BasicColorSchema) {
  const container = document.getElementById(name)

  if (container?.shadowRoot) {
    // If running in content script, apply theme to shadow DOM
    container.shadowRoot.querySelector("html")?.setAttribute("class", mode)
    container.shadowRoot.querySelector("#app")?.setAttribute("data-theme", mode)
  } else {
    // If not in content script, apply theme to the main document
    document.documentElement.setAttribute("class", mode)
    document.querySelector("#app")?.setAttribute("data-theme", mode)
  }
}

export function useTheme() {
  const { data: mode } = useBrowserLocalStorage<BasicColorSchema>(
    "mode",
    "dark",
  )

  const isDark = computed({
    get: () => mode.value === "dark",
    set: (value) => {
      mode.value = value ? "dark" : "light"
      applyTheme(mode.value)
    },
  })

  const toggleDark = () => {
    isDark.value = !isDark.value
  }

  watch(isDark, (newValue) => {
    applyTheme(newValue ? "dark" : "light")
  })

  return {
    mode,
    isDark,
    toggleDark,
    applyTheme,
  }
}
