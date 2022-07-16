<template>
  <form
    data-vv-scope="form-login"
    action="javascript:void(0)"
    class="modal_form"
  >
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
    <label for="modalpass">
      {{ $t('form.password') }}
    </label>
    <input
      id="modalpass"
      v-model="form.password"
      v-validate="'required|max:32'"
      :data-vv-as="fields.password"
      name="password"
      type="password"
      class="pass form-control"
    >

    <a href="#" class="passremind">Напомнить пароль</a>

    <VeeAlerts
      :prop-errors="veeLoginErrors"
      style="margin-top: 10px"
    />

    <Alerts
      :prop-alerts="responseAlerts"
      :prop-class-alert="responseClassAlerts"
      style="margin-top: 10px"
      @resetAlerts="resetAlerts"
    />

    <ul class="modal_btns">
      <li>
        <button
          class="login"
          @click="onSubmitLogin"
        >
          {{ $t('link.enter') }}
        </button>
      </li>
      <li>
        <span
          class="close-button"
          @click="closeAuthModal"
        >
          {{ $t('link.cancel') }}
        </span>
      </li>
    </ul>
  </form>
</template>

<script>
import axios from 'axios'
import Alerts from '../Alerts'
import VeeAlerts from '../VeeAlerts'
import alertsMixin from '../../mixins/alertsMixin'

export default {
  name: 'LoginForm',
  components: {
    VeeAlerts,
    Alerts
  },
  mixins: [alertsMixin],
  props: ['statusResetFormLogin'],
  data () {
    return {
      form: {
        email: null,
        password: null
      },
      fields: {
        email: this.$t('form.email'),
        password: this.$t('form.password')
      },
      responseAlerts: null,
      responseClassAlerts: '',
      veeLoginErrors: null
    }
  },
  watch: {
    'statusResetFormLogin' () {
      this.resetFormLogin()
    }
  },
  methods: {
    resetAlerts () {
      this.responseAlerts = null
    },
    resetFormLogin () {
      this.form = {
        email: null,
        password: null
      }
      this.$validator.reset()
      this.veeLoginErrors = null
    },
    closeAuthModal () {
      this.veeLoginErrors = null
      this.$emit('handlerCloseAuthModal')
    },
    onSubmitLogin () {
      this.$validator.validateAll('form-login').then((result) => {
        if (result) {
          axios.post('/user/login', this.form).then((res) => {
            this.responseAlerts = res.data.message
            this.responseClassAlerts = 'alert-success'

            this.$store.dispatch('auth/saveToken', {
              token: res.data.token,
              remember: true
            })

            this.$store.dispatch('auth/fetchUser')

            this.resetFormLogin()

            setTimeout(() => {
              this.$emit('handlerCloseAuthModal')
              window.location.reload()
            }, 3000)
          }).catch((err) => {
            this.$log.error(err)
            if (typeof err.response !== 'undefined' && err.response.status === 401) {
              this.veeLoginErrors = null
              this.responseAlerts = err.response.data.message
              this.responseClassAlerts = 'alert-danger'
            }
            if (typeof err.response !== 'undefined' && err.response.status === 422) {
              this.veeLoginErrors = null
              this.responseAlerts = err.response.data.errors
              this.responseClassAlerts = 'alert-danger'
            }
          })
        } else {
          this.veeLoginErrors = this.$validator.errors.items.filter(el => el.scope === 'form-login')
          this.errorAlert()
        }
      })
    }
  }
}
</script>
