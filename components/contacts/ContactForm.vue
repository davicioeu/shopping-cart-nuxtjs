<template>
  <div class="contact_form">
    <h2>
      {{ $t('text.contact_us') }}
    </h2>
    <p v-html="contactMessage"></p>
    <form data-vv-scope="form-contacts" action="javascript:void(0)">
      <label>
        <input
          v-model="form.name"
          v-validate="'required|max:191'"
          :data-vv-as="fields.name"
          name="name"
          type="text"
          class="name"
          :placeholder="fields.name"
        >
      </label>
      <label>
        <input
          v-model="form.surname"
          v-validate="'required|max:191'"
          :data-vv-as="fields.surname"
          type="text"
          name="surname"
          class="lastname"
          :placeholder="fields.surname"
        >
      </label>
      <label>
        <input
          v-model="form.phone"
          v-validate="'required|max:191'"
          :data-vv-as="fields.phone"
          type="text"
          name="phone"
          class="phone"
          :placeholder="fields.phone"
        >
      </label>
      <label>
        <input
          v-model="form.email"
          v-validate="'required|email|max:191'"
          :data-vv-as="fields.email"
          type="email"
          name="email"
          class="email"
          :placeholder="fields.email"
        >
      </label>
      <label>
        <textarea
          v-model="form.message"
          v-validate="'required|max:50000'"
          :data-vv-as="fields.message"
          type="text"
          name="message"
          class="message"
          :placeholder="fields.message"
          rows="5"
        ></textarea>
      </label>
      <div class="info_checking">
        <ul>
          <li class="checkbox">
            <input
              id="personal_data"
              v-model="form.personal_data"
              v-validate="'required'"
              :data-vv-as="fields.personal_data"
              type="checkbox"
              name="personal_data"
            >
            <label for="personal_data">
              {{ $t('message.personal_data') }}
            </label>
          </li>
        </ul>
      </div>

      <VeeAlerts :prop-errors="veeContactErrors" />

      <Alerts
        :prop-alerts="responseAlerts"
        :prop-class-alert="responseClassAlerts"
        @resetAlerts="resetAlerts"
      />

      <button
        class="subscribe"
        @click="onSubmit"
      >
        {{ $t('form.send') }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import VeeAlerts from '../VeeAlerts'
import alertsMixin from '../../mixins/alertsMixin'
import Alerts from '../Alerts'

export default {
  name: 'ContactForm',
  components: {
    Alerts,
    VeeAlerts
  },
  mixins: [alertsMixin],
  data () {
    return {
      form: {
        name: null,
        surname: null,
        email: null,
        message: null,
        personal_data: false,
        phone: null
      },
      fields: {
        name: this.$t('form.name'),
        surname: this.$t('form.surname'),
        phone: this.$t('form.phone'),
        email: this.$t('form.email'),
        message: this.$t('form.message'),
        personal_data: this.$t('form.personal_data')
      },
      contactMessage: this.$t('message.contact_message'),
      responseAlerts: null,
      responseClassAlerts: '',
      veeContactErrors: null
    }
  },
  methods: {
    resetAlerts () {
      this.responseAlerts = null
    },
    onSubmit () {
      this.$validator.validateAll('form-contacts').then((result) => {
        if (result) {
          axios.post('/feedback', this.form).then((res) => {
            this.responseAlerts = res.data.message
            this.responseClassAlerts = 'alert-success'
            this.form = {
              name: null,
              surname: null,
              email: null,
              message: null,
              personal_data: false,
              phone: null
            }
            this.$validator.reset()
          }).catch((err) => {
            this.$log.error(err)
            if (typeof err.response !== 'undefined' && err.response.status === 422) {
              this.responseAlerts = err.response.data.errors
              this.responseClassAlerts = 'alert-danger'
            }
          })
        } else {
          this.veeContactErrors = this.$validator.errors.items.filter(el => el.scope === 'form-contacts')
          this.errorAlert()
        }
      })
    }
  }
}
</script>
