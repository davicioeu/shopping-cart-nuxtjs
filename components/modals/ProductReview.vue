<template>
  <div id="product-review-content" class="ask_about_cont fancybox-content" style="display: none;">
    <div class="ask_content">
      <template v-if="parentId === null">
        <h3>{{ $t('link.create_review') }}</h3>
      </template>
      <template v-else>
        <h3>{{ $t('text.response_to_user') }} {{ parentName }}</h3>
      </template>

      <form data-vv-scope="form-product-review"
            action="javascript:void(0)"
            class="ask_form"
      >
        <template v-if="parentId === null">
          <label class="label_name">
            {{ $t('form.rating') }}
          </label>
          <star-rating
            v-model="form.rating"
            style="margin-bottom: 10px"
            :increment="1"
            :max-rating="5"
            inactive-color="#CCCCCC"
            active-color="#FFCD00"
            :star-size="40"
            :show-rating="false"
          />
        </template>

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
          {{ $t('text.your_review') }}
        </label>
        <textarea
          id="message"
          v-model="form.message"
          v-validate="'required|max:10000'"
          name="message"
          type="text"
          :data-vv-as="fields.your_review"
          class="message"
          rows="5"
        ></textarea>

        <VeeAlerts
          :prop-errors="veeProductReviewErrors"
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
                    @click="onSubmitProductReview"
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
  name: 'ProductReview',
  components: {
    Alerts,
    VeeAlerts
  },
  mixins: [alertsMixin],
  props: ['productId', 'parentId', 'parentName'],
  data () {
    return {
      form: {
        product_id: this.productId,
        parent_id: this.parentId,
        name: null,
        rating: 4,
        email: null,
        message: null
      },
      fields: {
        name: this.$t('form.name'),
        email: this.$t('form.email'),
        your_review: this.$t('text.your_review'),
        rating: this.$t('form.rating')
      },
      responseAlerts: null,
      responseClassAlerts: '',
      veeProductReviewErrors: null
    }
  },
  watch: {
    'productId' (id) {
      this.form.product_id = id
    },
    'parentId' (id) {
      this.form.parent_id = id
    }
  },
  mounted () {
    this.form.product_id = this.productId
  },
  methods: {
    resetFormProductReview () {
      this.form = {
        product_id: this.productId,
        parent_id: this.parentId,
        name: null,
        rating: 4,
        email: null,
        message: null
      }
      this.$validator.reset()
      this.veeProductReviewErrors = null
    },
    resetAlerts () {
      this.responseAlerts = null
    },
    onSubmitProductReview () {
      console.log(this.form.parent_id)
      this.$validator.validateAll('form-product-review').then((result) => {
        if (result) {
          axios.post('/product/reviews/create', this.form).then((res) => {
            this.responseAlerts = res.data.message
            this.responseClassAlerts = 'alert-success'

            this.resetFormProductReview()
          }).catch((err) => {
            this.$log.error(err)
            if (typeof err.response !== 'undefined' && err.response.status === 422) {
              this.veeProductReviewErrors = null
              this.responseAlerts = err.response.data.errors
              this.responseClassAlerts = 'alert-danger'
            }
          })
        } else {
          this.veeProductReviewErrors = this.$validator
            .errors.items.filter(el => el.scope === 'form-product-review')
          this.errorAlert()
        }
      })
    }
  }
}
</script>
