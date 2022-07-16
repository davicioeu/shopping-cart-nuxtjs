export default {
  methods: {
    successAlert (message = null) {
      this.$notify({
        type: 'success',
        title: this.$t('text.title_alert'),
        text: (message) || this.$t('message.success_alert')
      })
    },
    errorAlert (message = null) {
      this.$notify({
        type: 'error',
        title: this.$t('text.title_alert'),
        text: (message) || this.$t('message.error_alert')
      })
    }
  }
}
