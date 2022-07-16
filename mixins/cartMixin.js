import { mapGetters } from 'vuex'
import alertsMixin from './alertsMixin'

export default {
  computed: mapGetters({
    CART_KEY: 'cart/key'
  }),
  mixins: [alertsMixin],
  methods: {
    addToCart (quantity) {
      this.$store.dispatch('cart/add', {
        productId: this.product.id,
        cartKey: this.CART_KEY,
        quantity
      }).then((res) => {
        if (res.status === 'success') {
          if (quantity === 1) {
            this.$store.dispatch('cart/increaseValueCount')
          } else {
            this.$store.dispatch('cart/sumValueCount', quantity)
          }

          if (this.$route.name === 'cart') {
            this.$store.dispatch('cart/updateRunGetCartData')
          }

          this.successAlert(this.$t('message.cart_success_add'))
        }
      }).catch((err) => {
        if (err.response.status === 422) {
          let alertMessage = ''
          // eslint-disable-next-line no-unused-vars
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            alertMessage += value.join('. ')
          }

          this.errorAlert(alertMessage)
        }
      })
    }
  }
}
