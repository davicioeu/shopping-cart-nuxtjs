export default ({ store, redirect }) => {
  if (!store.getters['auth/check']) {
    if (!process.server) {
      this.$router.push({ name: 'login' })
    }

    return redirect(`/${process.env.APP_LOCALE}/login`)
  }
}
