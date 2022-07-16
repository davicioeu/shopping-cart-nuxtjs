<template>
  <div>
    <div class="quantity">
      <p v-if="product.available > 0 && product.uah_price > 0" class="quant_name">
        {{ $t('text.quantity') }}
      </p>
      <div
        v-if="product.available > 0 && product.uah_price > 0"
        class="input-group plus-minus-input"
      >
        <div class="input-group-button">
          <button
            type="button"
            class="circle"
            @click="changeQuantity('dec')"
          >
            <i class="fa fa-minus" aria-hidden="true" />
          </button>
        </div>

        <input
          v-model="quantity"
          class="input-group-field"
          type="number"
          name="quantity"
        >

        <div class="input-group-button">
          <button
            type="button"
            class="circle"
            @click="changeQuantity('inc')"
          >
            <i class="fa fa-plus" aria-hidden="true" />
          </button>
        </div>
      </div>
      <button class="favorites" @click="addToFavorite">
        {{ $t('link.add_to_favorite') }}
      </button>
      <button
        class="ask_about_mobile"
        data-fancybox data-src="#ask_about-content"
      >
        {{ $t('link.ask_question_about_product') }}
      </button>
    </div>
    <div class="buy_buttons">
      <template v-if="product.available > 0 && product.uah_price > 0">
        <button
          class="buy_it"
          @click="addToCart(quantity)"
        >
          {{ $t('link.buy') }}
        </button>
        <button
          class="buy_oneclick"
          data-fancybox data-src="#buy_oneclick-content"
        >
          {{ $t('link.buy_in_one_click') }}
        </button>
      </template>
      <button
        class="ask_about"
        data-fancybox data-src="#ask_about-content"
      >
        {{ $t('link.ask_question_about_product') }}
      </button>
    </div>

    <ProductQuestion :product-id="product.id" />
  </div>
</template>

<script>
import ProductQuestion from '../modals/ProductQuestion'
import favoriteMixin from '../../mixins/favoriteMixin'
import alertsMixin from '../../mixins/alertsMixin'
import cartMixin from '../../mixins/cartMixin'

export default {
  name: 'BuyAndQuestion',
  components: {
    ProductQuestion
  },
  mixins: [favoriteMixin, alertsMixin, cartMixin],
  props: ['product'],
  data: () => ({
    quantity: 1,
    oldValueQuantity: null
  }),
  watch: {
    'quantity' (quantity) {
      this.validChangeQuantity()
    }
  },
  methods: {
    validChangeQuantity () {
      if (this.quantity < 1) {
        this.quantity = 1
      }
      if (this.quantity === this.oldValueQuantity) {
        return true
      }
      if (this.quantity > this.product.available) {
        this.quantity = this.product.available
      }
    },
    changeQuantity (operation) {
      this.oldValueQuantity = this.quantity
      if (operation === 'inc') {
        this.quantity++
      } else {
        this.quantity--
      }
      this.validChangeQuantity()
    }
  }
}
</script>
