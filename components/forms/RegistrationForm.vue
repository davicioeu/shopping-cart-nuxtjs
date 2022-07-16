<template>
  <form
    data-vv-scope="form-registration"
    action="javascript:void(0)"
    class="modal_form_registration"
  >
    <div class="row">
      <div class="block">
        <label class="modalname" for="modalname">
          {{ $t('form.name') }}
        </label>
        <input
          id="modalname"
          v-model="form.name"
          v-validate="'required|max:191'"
          :data-vv-as="fields.name"
          name="name"
          type="text"
          class="name form-control"
        >
      </div>
      <div class="block">
        <label class="modallastname" for="modallastname">
          {{ $t('form.surname') }}
        </label>
        <input
          id="modallastname"
          v-model="form.surname"
          v-validate="'required|max:191'"
          :data-vv-as="fields.surname"
          name="surname"
          type="text"
          class="lastname form-control"
        >
      </div>
    </div>
    <div class="row">
      <div class="block">
        <label class="modalphone" for="modalphone">
          {{ $t('form.phone') }}
        </label>
        <input
          id="modalphone"
          v-model="form.phone"
          v-validate="'required|max:191'"
          :data-vv-as="fields.phone"
          name="phone"
          type="text"
          class="phone form-control"
        >
      </div>
      <div class="block">
        <label class="modalemail" for="modalemail">
          {{ $t('form.email') }}
        </label>
        <input
          id="modalemail"
          v-model="form.email"
          v-validate="'required|max:191|email'"
          :data-vv-as="fields.email"
          name="email"
          type="text"
          class="email form-control"
        >
      </div>
    </div>
    <div class="row">
      <div class="block">
        <label class="modapass" for="modalpass">
          {{ $t('form.password') }}
        </label>
        <input
          id="modalpass"
          v-model="form.password"
          v-validate="'required|max:32|min:6'"
          :data-vv-as="fields.password"
          name="password"
          type="password"
          class="pass form-control"
        >
      </div>
      <div class="block">
        <label class="modapassconfirm" for="modalpassconfirm">
          {{ $t('form.password_confirmation') }}
        </label>
        <input
          id="modalpassconfirm"
          v-model="form.password_confirmation"
          v-validate="'required|max:32|min:6'"
          :data-vv-as="fields.password_confirmation"
          name="password_confirmation"
          type="password"
          class="passconfirm form-control"
        >
      </div>
    </div>
    <div class="block_btns">
      <p class="therms">
        {{ $t('message.reg_desc_1') }}
        <nuxt-link :to="{ name: 'userAgreement' }">
          {{ $t('message.reg_desc_2') }}
        </nuxt-link>
      </p>

      <VeeAlerts :prop-errors="veeRegistrationErrors" />

      <Alerts
        :prop-alerts="responseAlerts"
        :prop-class-alert="responseClassAlerts"
        @resetAlerts="resetAlerts"
      />

      <ul class="modal_btns">
        <li>
          <button
            class="login"
            @click="onSubmitRegistration"
          >
            {{ $t('link.register') }}
          </button>
        </li>
        <li>
          <span
            class="close-button2"
            @click="closeAuthModal"
          >
            {{ $t('link.cancel') }}
          </span>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import Alerts from '../Alerts'
import VeeAlerts from '../VeeAlerts'
import alertsMixin from '../../mixins/alertsMixin'

export default {
  name: 'RegistrationForm',
  components: {
    VeeAlerts,
    Alerts
  },
  mixins: [alertsMixin],
  props: ['statusResetFormRegistration'],
  data () {
    return {
      form: {
        name: null,
        surname: null,
        phone: null,
        email: null,
        password: null,
        password_confirmation: null
      },
      fields: {
        name: this.$t('form.name'),
        surname: this.$t('form.surname'),
        phone: this.$t('form.phone'),
        email: this.$t('form.email'),
        password: this.$t('form.password'),
        password_confirmation: this.$t('form.password_confirmation')
      },
      responseAlerts: null,
      responseClassAlerts: '',
      veeRegistrationErrors: null
    }
  },
  watch: {
    'statusResetFormRegistration' () {
      this.resetFormRegistration()
    }
  },
  methods: {
    resetAlerts () {
      this.responseAlerts = null
    },
    resetFormRegistration () {
      this.form = {
        name: null,
        surname: null,
        phone: null,
        email: null,
        password: null,
        password_confirmation: null
      }
      this.$validator.reset()
      this.veeRegistrationErrors = null
    },
    closeAuthModal () {
      this.veeRegistrationErrors = null
      this.$emit('handlerCloseAuthModal')
    },
    onSubmitRegistration () {
      this.$validator.validateAll('form-registration').then((result) => {
        if (result) {
          axios.post('/user/registration', this.form).then((res) => {
            this.responseAlerts = res.data.message
            this.responseClassAlerts = 'alert-success'

            this.$store.dispatch('auth/saveToken', {
              token: res.data.token,
              remember: true
            })

            this.$store.dispatch('auth/fetchUser')

            this.resetFormRegistration()

            setTimeout(() => {
              this.$emit('handlerCloseAuthModal')
              window.location.reload()
            }, 3000)
          }).catch((err) => {
            this.$log.error(err)
            if (typeof err.response !== 'undefined' && err.response.status === 422) {
              this.veeRegistrationErrors = null
              this.responseAlerts = err.response.data.errors
              this.responseClassAlerts = 'alert-danger'
            }
          })
        } else {
          this.veeRegistrationErrors = this.$validator.errors.items.filter(el => el.scope === 'form-registration')
          this.errorAlert()
        }
      })
    }
  }
}
</script>
