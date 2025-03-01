// This import scss file is used to style the shadow DOM container
// import "./index.scss"
import app from "../ui/content-script-iframe/index"

// TODO: inject styles

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
    appContainer.className = "crx-iframe" // Reuse the same class for styling

    // Create style element for shadow DOM
    const styleElement = document.createElement("style")
    styleElement.textContent = `
      .crx-iframe {
        border: none;
        border-radius: 8px;
        box-shadow:
          0 2px 4px rgba(0, 0, 0, 0.2),
          0 -1px 0px rgba(0, 0, 0, 0.02);
        background-color: #fff;
        margin: 2em;
        width: 420px;
        height: 340px;
        overflow: hidden;
      }
    `

    // Append elements to shadow root
    shadowRoot.appendChild(styleElement)
    shadowRoot.appendChild(appContainer)
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
