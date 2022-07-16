import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Validator } from 'vee-validate'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: process.env.appLocale,
  messages: {}
})

export default async ({ app, store }) => {
  if (process.client) {
    await loadMessages(store.getters['lang/locale'])
  }

  app.i18n = i18n
}

/**
 * @param {String} locale
 */
export async function loadMessages (locale) {
  if (Object.keys(i18n.getLocaleMessage(locale)).length === 0) {
    const messages = await import(/* webpackChunkName: "lang-[request]" */ `~/lang/${locale}`)
    i18n.setLocaleMessage(locale, messages)
  }

  Validator.localize(locale)
  i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    Validator.localize(newLocale)
  }

  if (i18n.locale !== locale) {
    i18n.locale = locale
  }
}
