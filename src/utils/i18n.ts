import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

// restore locale from local storage

const currentLocale = useBrowserLocalStorage<string>('user-locale', 'en')

i18n.global.locale.value = currentLocale.value
