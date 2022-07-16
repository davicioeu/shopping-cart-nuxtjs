<template>
  <div class="quantity">
    <div class="input-group plus-minus-input">
      <div class="input-group-button">
        <button
          type="button"
          class="circle"
          @click="changeQuantity(cartProduct.product_id, 'dec')"
        >
          <i class="fa fa-minus" aria-hidden="true" />
        </button>
      </div>
      <input
        v-model="cartProduct.quantity"
        class="input-group-field"
        type="number"
        @focus="focusQuantity(cartProduct.quantity)"
        @blur="oldValueQuantity = null"
      >
      <div class="input-group-button">
        <button
          type="button"
          class="circle"
          @click="changeQuantity(cartProduct.product_id)"
        >
          <i class="fa fa-plus" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import alertsMixin from '../../mixins/alertsMixin'

export default {
  name: 'Quantity',
  mixins: [alertsMixin],
  props: ['cartProduct', 'product', 'cartKey'],
  data: () => ({
    oldValueQuantity: null
  }),
  watch: {
    'cartProduct.quantity' (value) {
      if (value < 1) {
        this.cartProduct.quantity = 1
        this.oldValueQuantity = 1
      }
      if (value > this.product.available) {
        this.cartProduct.quantity = this.product.available
        this.oldValueQuantity = this.product.available
      }
      if (this.oldValueQuantity === null ||
        !value.length ||
        this.cartProduct.quantity === this.oldValueQuantity ||
        value === this.oldValueQuantity) {
        return false
      }

      this.apiQuery(this.cartProduct.product_id, this.cartProduct.quantity)
    }
  },
  methods: {
    focusQuantity (quantity) {
      this.oldValueQuantity = quantity
    },
    apiQuery (productId, quantity) {
      return this.$store.dispatch('cart/changeQuantity', {
        productId,
        cartKey: this.cartKey,
        quantity
      }).then(() => {
        this.successAlert(this.$t('message.success_alert'))
      }).catch((err) => {
        this.$log.error(err)
        this.cartProduct.quantity = this.product.available
        this.oldValueQuantity = quantity
        if (typeof err.response !== 'undefined' && err.response.status === 422) {
          this.$emit('setResponseAlerts', err.response.data.errors)
          this.$emit('setResponseClassAlerts', 'alert-danger')
        }
      })
    },
    changeQuantity (productId, operation = 'inc') {
      const cartProduct = _.cloneDeep(this.cartProduct)
      const quantity = (operation === 'inc') ? cartProduct.quantity + 1 : cartProduct.quantity - 1

      if (quantity < 1 || quantity > this.product.available) {
        return false
      }

      this.apiQuery(productId, quantity).then(() => {
        if (operation === 'inc') {
          this.cartProduct.quantity++
        } else {
          this.cartProduct.quantity--
        }
        this.$emit('setTotalData')
      })
    }
  }
}
</script>
