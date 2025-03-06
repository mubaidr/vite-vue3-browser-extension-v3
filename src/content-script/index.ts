// This import scss file is used to style the shadow DOM container
import rootStyles from "./index.scss?raw"
import contentScriptStyles from "src/ui/content-script-iframe/index.scss?raw"
import app from "../ui/content-script-iframe/index"

/**
 * Creates a Shadow DOM host and mounts the Vue app within it
 * @returns {void}
 */
const injectShadowDOM = (): void => {
  // Type guard to ensure we have a document body
  if (!document.body) {
    console.error("Document body not found, cannot inject shadow DOM")
    return
  }

  try {
    // Create host element
    const hostElement = document.createElement("div")
    hostElement.id = "crx-host"
    hostElement.style.cssText =
      "position: fixed; bottom: 0; right: 0; z-index: 9999;"

    // Attach shadow DOM
    const shadowRoot = hostElement.attachShadow({ mode: "open" })

    // Create container for Vue app
    const appContainer = document.createElement("div")
    appContainer.id = "app"
    appContainer.className = "crx-iframe" // Apply the crx-iframe class

    // Create style element for root styles in shadow DOM
    const rootStyleElement = document.createElement("style")
    rootStyleElement.textContent = rootStyles

    // Create style element for content script styles
    const contentScriptStyleElement = document.createElement("style")
    contentScriptStyleElement.textContent = contentScriptStyles

    // Append style elements before appContainer to ensure styles are loaded first
    shadowRoot.appendChild(rootStyleElement)
    shadowRoot.appendChild(contentScriptStyleElement)
    shadowRoot.appendChild(appContainer)

    // Append the host element to the document body
    document.body.appendChild(hostElement)

    // Mount Vue app into the shadow DOM
    app.mount(appContainer)

    console.info("Vue app successfully mounted in Shadow DOM")
  } catch (error) {
    console.error("Failed to inject Shadow DOM:", error)
  }
}

// Execute the injection
injectShadowDOM()

self.onerror = function (message, source, lineno, colno, error) {
  console.info("Error: " + message)
  console.info("Source: " + source)
  console.info("Line: " + lineno)
  console.info("Column: " + colno)
  console.info("Error object: " + error)
}

console.info("hello world from content-script")
