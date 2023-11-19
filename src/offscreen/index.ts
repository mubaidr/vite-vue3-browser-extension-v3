// redirect logs to background script
window.console.log = (...data) => {
  chrome.runtime.sendMessage({
    type: 'CONSOLE_LOG',
    data,
  })
}

console.log('console log from offscreen document')
