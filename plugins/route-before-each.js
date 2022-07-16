export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    let locale = to.params.lang

    const localeStore = app.store.state.lang.locale
    const locales = app.store.state.lang.locales
    if (!locale) {
      locale = localeStore
    }

    if (!(locale in locales)) {
      return next(process.env.appLocale)
    }

    import(`./../lang/${locale}`).then((msgs) => {
      app.i18n.setLocaleMessage(locale, msgs.default || msgs)
      app.i18n.locale = locale

      app.store.dispatch('lang/setLocale', { locale })

      next()
    })

    next()
  })
}
