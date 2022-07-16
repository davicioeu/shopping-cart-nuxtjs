<template>
  <section class="faq">
    <div class="container faq_fullscreen">
      <div class="row fs-row">
        <div class="faq_form">
          <h2>
            {{ $t('message.faq_1') }}
          </h2>
          <p class="ff_text">
            {{ $t('message.faq_2') }}
          </p>
          <form data-vv-scope="form-question" action="javascript:void(0)">
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

            <VeeAlerts style="margin-top: 15px" :prop-errors="veeFaqErrors" />

            <Alerts
              :prop-alerts="responseAlerts"
              :prop-class-alert="responseClassAlerts"
              @resetAlerts="resetAlerts"
            />
          </form>
        </div>
        <div class="man_img">
          <img src="/images/man-bg.png" alt="">
        </div>
        <div class="rounds">
          <img src="/images/ellipse_big.png" class="round_one">
          <img src="/images/ellipse_small.png" class="round_two">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import faqMixin from '../mixins/faqMixin'
import VeeAlerts from './VeeAlerts'
import Alerts from './Alerts'

export default {
  name: 'FAQ',
  components: {
    Alerts,
    VeeAlerts
  },
  mixins: [faqMixin],
  data () {
    return {
      veeFaqErrors: null,
      veeFormName: 'form-question'
    }
  },
  methods: {
    setVeeErrors () {
      this.veeFaqErrors = this.$validator.errors.items.filter(el => el.scope === this.veeFormName)
    }
  }
}
</script>
