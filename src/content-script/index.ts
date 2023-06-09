import './index.scss'

const src = chrome.runtime.getURL('src/content-script/iframe/index.html')

const iframe = new DOMParser().parseFromString(
  `<iframe class="crx-iframe" src="${src}"></iframe>`,
  'text/html'
).body.firstElementChild

if (iframe) {
  document.body?.append(iframe)
}
