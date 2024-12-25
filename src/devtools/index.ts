self.onerror = function (message, source, lineno, colno, error) {
  console.info('Error: ' + message)
  console.info('Source: ' + source)
  console.info('Line: ' + lineno)
  console.info('Column: ' + colno)
  console.info('Error object: ' + error)
}

console.info('hello world from devtools html')

chrome.devtools.panels.create(
  'My Panel',
  chrome.runtime.getURL('src/assets/logo.png'),
  chrome.runtime.getURL('src/ui/devtools-panel/index.html'),
  function (panel) {
    console.info('Panel created', panel)
  }
)

chrome.devtools.panels.elements.createSidebarPane(
  'My Sidebar',
  function (sidebar) {
    sidebar.setObject(JSON.stringify({ some_data: 'Some data to show' }))
    console.info('Sidebar created', sidebar)
  }
)
