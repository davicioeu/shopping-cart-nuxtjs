<template>
  <form data-vv-scope="form-subscribe" action="javascript:void(0)">
    <input
      v-model="form.email"
      v-validate="'required|max:191'"
      :data-vv-as="fields.email"
      name="email"
      type="text"
      class="email"
      :placeholder="fields.email"
    >

    <VeeAlerts :prop-errors="veeSubscribeErrors" />

    <Alerts
      :prop-alerts="responseAlerts"
      :prop-class-alert="responseClassAlerts"
      @resetAlerts="resetAlerts"
    />

    <input
      type="button"
      class="button subscribe"
      :value="fields.subscribe"
      @click="onSubmit"
    >
  </form>
</template>

<script>
import axios from 'axios'
import alertsMixin from '../../mixins/alertsMixin'
import VeeAlerts from '../VeeAlerts'
import Alerts from '../Alerts'

export default {
  name: 'SubscribeForm',
  components: {
    Alerts,
    VeeAlerts
  },
  mixins: [alertsMixin],
  data () {
    return {
      form: {
        email: null
      },
      fields: {
        email: this.$t('form.email'),
        subscribe: this.$t('link.subscribe')
      },
      responseAlerts: null,
      responseClassAlerts: '',
      veeSubscribeErrors: null
    }
  },
  methods: {
    resetAlerts () {
      this.responseAlerts = null
    },
    onSubmit () {
      this.$validator.validateAll('form-subscribe').then((result) => {
        if (result) {
          axios.post('/subscribe', this.form).then((res) => {
            this.responseAlerts = res.data.message
            this.responseClassAlerts = 'alert-success'
            this.form = {
              email: null
            }
            this.$validator.reset()
            this.successAlert()
          }).catch((err) => {
            this.$log.error(err)
            if (typeof err.response !== 'undefined' && err.response.status === 422) {
              this.responseAlerts = err.response.data.errors
              this.responseClassAlerts = 'alert-danger'
            }
          })
        } else {
          this.veeSubscribeErrors = this.$validator.errors.items.filter(el => el.scope === 'form-subscribe')
          this.errorAlert()
        }
      })
    }
  }
}
</script>
