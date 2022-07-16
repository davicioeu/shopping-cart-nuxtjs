import axios from 'axios'
import alertsMixin from '../mixins/alertsMixin'

export default {
  mixins: [alertsMixin],
  data () {
    return {
      form: {
        email: null,
        message: null
      },
      fields: {
        email: this.$t('form.email'),
        message: this.$t('form.question'),
        send: this.$t('form.send')
      },
      responseAlerts: null,
      responseClassAlerts: ''
    }
  },
  methods: {
    resetAlerts () {
      this.responseAlerts = null
    },
    onSubmit () {
      this.$validator.validateAll(this.veeFormName).then((result) => {
        if (result) {
          axios.post('/question', this.form).then((res) => {
            this.responseAlerts = res.data.message
            this.responseClassAlerts = 'alert-success'
            this.form = {
              email: null,
              message: null
            }
            this.$validator.reset()
            this.successAlert()
          }).catch((err) => {
            if (err.response.status === 422) {
              this.responseAlerts = err.response.data.errors
              this.responseClassAlerts = 'alert-danger'
            }
          })
        } else {
          this.setVeeErrors()
          this.errorAlert()
        }
      })
    }
  }
}
