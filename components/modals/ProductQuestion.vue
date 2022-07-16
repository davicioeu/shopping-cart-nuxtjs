<template>
  <div id="ask_about-content" class="ask_about_cont fancybox-content" style="display: none;">
    <div class="ask_content">
      <h3>{{ $t('text.product_question') }}</h3>
      <form data-vv-scope="form-product-question"
            action="javascript:void(0)"
            class="ask_form"
      >
        <label class="label_name" for="name">
          {{ $t('form.name') }}
        </label>
        <input id="name"
               v-model="form.name"
               v-validate="'required|max:191'"
               name="name"
               :data-vv-as="fields.name"
               type="text"
               class="name"
        />

        <label class="label_email" for="email">
          {{ $t('form.email') }}
        </label>
        <input id="email"
               v-model="form.email"
               v-validate="'required|max:191|email'"
               name="email"
               :data-vv-as="fields.email"
               type="email"
               class="email"
        >

        <label class="label_text">
          {{ $t('text.your_question') }}
        </label>
        <textarea
          id="message"
          v-model="form.message"
          v-validate="'required|max:20000'"
          name="message"
          type="text"
          :data-vv-as="fields.message"
          class="message"
          rows="5"
        ></textarea>

        <VeeAlerts
          :prop-errors="veeProductQuestionErrors"
        />

        <Alerts
          :prop-alerts="responseAlerts"
          :prop-class-alert="responseClassAlerts"
          style="margin-top: 10px"
          @resetAlerts="resetAlerts"
        />

        <ul class="ask_btns">
          <li>
            <button class="ask_buy"
                    @click="onSubmitProductQuestion"
            >
              {{ $t('form.send') }}
            </button>
          </li>
          <li>
            <span data-fancybox-close class="ask-close-button">
              {{ $t('link.cancel') }}
            </span>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VeeAlerts from '../VeeAlerts'
import Alerts from '../Alerts'
import alertsMixin from '../../mixins/alertsMixin'

export default {
  name: 'ProductQuestion',
  components: {
    Alerts,
    VeeAlerts
  },
  mixins: [alertsMixin],
  props: ['productId'],
  data () {
    return {
      form: {
        product_id: this.productId,
        name: null,
        email: null,
        message: null
      },
      fields: {
        name: this.$t('form.name'),
        email: this.$t('form.email'),
        message: this.$t('form.message')
      },
      responseAlerts: null,
      responseClassAlerts: '',
      veeProductQuestionErrors: null
    }
  },
  watch: {
    'productId' (id) {
      this.form.product_id = id
    }
  },
  mounted () {
    this.form.product_id = this.productId
  },
  methods: {
    resetFormProductQuestion () {
      this.form = {
        product_id: this.productId,
        name: null,
        email: null,
        message: null
      }
      this.$validator.reset()
      this.veeProductQuestionErrors = null
    },
    resetAlerts () {
      this.responseAlerts = null
    },
    onSubmitProductQuestion () {
      this.$validator.validateAll('form-product-question').then((result) => {
        if (result) {
          axios.post('/product/question/create', this.form).then((res) => {
            this.responseAlerts = res.data.message
            this.responseClassAlerts = 'alert-success'

            this.resetFormProductQuestion()
          }).catch((err) => {
            this.$log.error(err)
            if (typeof err.response !== 'undefined' && err.response.status === 422) {
              this.veeProductQuestionErrors = null
              this.responseAlerts = err.response.data.errors
              this.responseClassAlerts = 'alert-danger'
            }
          })
        } else {
          this.veeProductQuestionErrors = this.$validator
            .errors.items.filter(el => el.scope === 'form-product-question')
          this.errorAlert()
        }
      })
    }
  }
}
</script>
