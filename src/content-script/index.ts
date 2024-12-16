const iframe = document.createElement('iframe')
iframe.src = chrome.runtime.getURL('src/content-script/iframe/index.html')

// iframe.style.cssText = `width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 999999; border: none;`

document.body?.append(iframe)

if (iframe) {
  iframe.onload = () => {
    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow?.document

    if (!iframeDocument) {
      return
    }

    // Create a style element to inject CSS
    const style = document.createElement('style')

    // Dynamically import the SCSS/CSS
    import('src/content-script/index.scss?inline').then((module) => {
      style.textContent = module.default
      iframeDocument.head.appendChild(style)
    })

    // Enable hot-reloading if in development mode
    if (import.meta.hot) {
      import.meta.hot.accept(() => {
        // On hot-reload, dynamically inject the updated styles into the iframe
        import('src/content-script/index.scss?inline').then((module) => {
          style.textContent = module.default
          iframeDocument.head.appendChild(style)
        })
      })
    }
  }
}
