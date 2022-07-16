<template>
  <section class="faq_mobile">
    <div class="container">
      <div class="row">
        <div class="faq_form">
          <h2>
            {{ $t('message.faq_1') }}
          </h2>
          <p class="ff_text">
            {{ $t('message.faq_2') }}
          </p>
          <form data-vv-scope="form-question-mobile" action="javascript:void(0)">
            <input
              v-model="form.message"
              v-validate="'required|max:50000'"
              :data-vv-as="fields.message"
              name="message"
              type="text"
              class="question"
              :placeholder="fields.message"
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
              type="button"
              class="button"
              :value="fields.send"
              @click="onSubmit"
            >

            <VeeAlerts style="margin-top: 15px" :prop-errors="veeFaqMobileErrors" />

            <Alerts
              :prop-alerts="responseAlerts"
              :prop-class-alert="responseClassAlerts"
              @resetAlerts="resetAlerts"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import faqMixin from '../mixins/faqMixin'
import Alerts from './Alerts'
import VeeAlerts from './VeeAlerts'

export default {
  name: 'FAQMobile',
  components: {
    VeeAlerts,
    Alerts
  },
  mixins: [faqMixin],
  data () {
    return {
      veeFaqMobileErrors: null,
      veeFormName: 'form-question-mobile'
    }
  },
  methods: {
    setVeeErrors () {
      this.veeFaqMobileErrors = this.$validator.errors.items.filter(el => el.scope === this.veeFormName)
    }
  }
}
</script>
