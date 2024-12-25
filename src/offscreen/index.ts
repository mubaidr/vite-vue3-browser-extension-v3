// redirect logs to background script
window.console.info = (...data) => {
  chrome.runtime.sendMessage({
    type: "CONSOLE_LOG",
    data,
  })
}

console.info("console log from offscreen document")
