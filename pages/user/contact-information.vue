<template>
  <section class="contact_information my_ordersinfo_mobile">
    <div class="container">
      <div class="row">
        <Links :block-classes="'contact_btns'" />

        <div class="personal_data">
          <h2>
            {{ $t('link.contact_information') }}
          </h2>
          <ul>
            <li class="name">
              {{ `${form.name} ${form.surname}` }}
            </li>
            <li class="phone">
              {{ form.phone }}
            </li>
            <li class="email">
              {{ form.email }}
            </li>
          </ul>

          <form data-vv-scope="form-contact-information" action="javascript:void(0)">
            <input
              v-model="form.name"
              v-validate="'required|max:191'"
              :data-vv-as="fields.name"
              name="name"
              type="text"
              class="name"
              :placeholder="fields.name"
            >
            <input
              v-model="form.surname"
              v-validate="'required|max:191'"
              :data-vv-as="fields.surname"
              name="surname"
              type="text"
              class="lastname"
              :placeholder="fields.surname"
            >
            <input
              v-model="form.phone"
              v-validate="'required|max:191'"
              :data-vv-as="fields.phone"
              name="phone"
              type="text"
              class="phone"
              :placeholder="fields.phone"
            >
            <input
              v-model="form.email"
              v-validate="'required|max:191'"
              :data-vv-as="fields.email"
              name="email"
              type="text"
              class="email"
              :placeholder="fields.email"
            >
            <input
              v-model="form.old_password"
              v-validate="'max:32'"
              :data-vv-as="fields.old_password"
              name="old_password"
              type="password"
              class="oldpass"
              :placeholder="fields.old_password"
            >
            <input
              v-model="form.new_password"
              v-validate="'max:32'"
              :data-vv-as="fields.new_password"
              name="new_password"
              type="password"
              class="newpass"
              :placeholder="fields.new_password"
            >

            <VeeAlerts :prop-errors="veeContactInformationErrors" />

            <Alerts
              :prop-alerts="responseAlerts"
              :prop-class-alert="responseClassAlerts"
              @resetAlerts="resetAlerts"
            />

            <div class="btns">
              <button
                class="save"
                @click="onSubmitContactInformation"
              >
                {{ $t('form.save') }}
              </button>
              <button
                class="cancel"
                @click="resetContactInformation"
              >
                {{ $t('link.cancel') }}
              </button>
            </div>
          </form>
        </div>

        <Links :block-classes="'contact_btns my_ordersinfo_mobile_btns'" />
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Links from '../../components/user/Links'
import Alerts from '../../components/Alerts'
import VeeAlerts from '../../components/VeeAlerts'

export default {
  name: 'UserContactInformation',
  middleware: 'auth',
  components: {
    VeeAlerts,
    Alerts,
    Links
  },
  head () {
    return {
      title: this.$t('link.contact_information')
    }
  },
  data () {
    return {
      form: {
        name: null,
        surname: null,
        email: null,
        phone: null,
        old_password: null,
        new_password: null
      },
      fields: {
        name: this.$t('form.name'),
        surname: this.$t('form.surname'),
        phone: this.$t('form.phone'),
        email: this.$t('form.email'),
        old_password: this.$t('form.old_password'),
        new_password: this.$t('form.new_password')
      },
      responseAlerts: null,
      responseClassAlerts: '',
      veeContactInformationErrors: null
    }
  },
  computed: mapGetters({
    USER: 'auth/user'
  }),
  mounted () {
    this.form = {
      name: this.USER.user_name,
      surname: this.USER.user_surname,
      email: this.USER.email,
      phone: this.USER.phone
    }

    this.$store.dispatch('breadcrumbs/setBreadcrumbs', [
      { linkName: this.$t('link.contact_information') }
    ])
  },
  methods: {
    resetAlerts () {
      this.responseAlerts = null
    },
    setData () {
      this.form = {
        name: this.USER.user_name,
        surname: this.USER.user_surname,
        email: this.USER.email,
        phone: this.USER.phone,
        old_password: null,
        new_password: null
      }
    },
    resetContactInformation () {
      this.setData()
    },
    onSubmitContactInformation () {
      this.$validator.validateAll('form-contact-information').then((result) => {
        if (result) {
          axios.post('/user/update', this.form).then((res) => {
            this.responseAlerts = res.data.message
            this.responseClassAlerts = 'alert-success'

            this.$store.dispatch('auth/fetchUser').then(() => {
              this.setData()
            })

            this.$validator.reset()
          }).catch((err) => {
            if (err.response.status === 422) {
              this.responseAlerts = err.response.data.errors
              this.responseClassAlerts = 'alert-danger'
            }
          })
        } else {
          this.veeContactInformationErrors = this.$validator.errors.items
            .filter(el => el.scope === 'form-contact-information')
          this.errorAlert()
        }
      })
    }
  }
}
</script>
