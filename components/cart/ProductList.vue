<template>
  <div class="row">
    <div class="items_in_cart">
      <div
        v-for="product in products"
        :key="`cart-product-${product.id}`"
        class="product"
      >
        <div class="product_img">
          <nuxt-link
            v-if="product.slug.length"
            :to="{ name: 'product', params: { product_slug: product.slug } }"
          >
            <img
              v-if="product.main_image !== null"
              :src="getUrlImg(`products/${product.main_image.image_origin}`)"
              :alt="product.name"
            >
          </nuxt-link>
        </div>
        <div class="product_information">
          <button
            class="product_close"
            @click="deleteProduct(product.id)"
          >
            <i class="fas fa-times" />
          </button>
          <div class="product_name">
            <nuxt-link
              class="product_name_link"
              :to="{ name: 'product', params: { product_slug: product.slug } }"
            >
              <h2>{{ product.name }}</h2>
            </nuxt-link>
            <p class="sku">
              {{ $t('text.article') }}:
              <span class="sku_numb">
                {{ product.article }}
              </span>
            </p>
            <p :class="product.available > 0 ? 'availability_plus' : 'availability_minus'">
              <template v-if="product.available > 0">
                {{ $t('text.in_stock') }}
              </template>
              <template v-else>
                {{ $t('text.out_of_stock') }}
              </template>
            </p>
          </div>

          <Quantity
            :cart-key="CART_KEY"
            :cart-product="getCartProduct(product.id)"
            :product="product"
            @setTotalData="setTotalData"
            @setResponseAlerts="emitSetResponseAlerts"
            @setResponseClassAlerts="emitSetResponseClassAlerts"
          />

          <div class="product_price">
            <p class="price">
              <strike v-if="product.uah_old_price > 0">
                {{ getTotalPrice(product.id, product.uah_old_price) }} {{ $t('text.uah') }}<br>
              </strike>
              {{ getTotalPrice(product.id, product.uah_price) }} {{ $t('text.uah') }}
            </p>
            <button
              class="delete"
              @click="deleteProduct(product.id)"
            >
              {{ $t('link.delete') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <Total
      :add-class-after-scroll="addClassAfterScroll"
      :count-products="countProducts"
      :total-price="totalPrice"
      :discount="discount"
      :for-payment="forPayment"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import imageMixin from '../../mixins/imageMixin'
import Total from './Total'
import Quantity from './Quantity'

export default {
  name: 'ProductList',
  components: {
    Quantity,
    Total
  },
  mixins: [imageMixin],
  props: ['addClassAfterScroll'],
  head () {
    return {
      title: this.$t('link.cart')
    }
  },
  data: () => ({
    countProducts: 0,
    totalPrice: 0,
    discount: 0,
    forPayment: 0,
    products: [],
    cartProducts: []
  }),
  computed: mapGetters({
    CART_KEY: 'cart/key',
    ID_PRODUCTS: 'cart/idProducts',
    RUN_GET_CART_DATA: 'cart/runGetCartData'
  }),
  watch: {
    'CART_KEY' () {
      this.getCart()
    },
    'RUN_GET_CART_DATA' () {
      this.getCart()
    },
    'ID_PRODUCTS' (idProducts) {
      if (idProducts.length === 0) {
        this.$emit('setResponseAlerts', this.$t('message.empty_cart'))
      } else {
        this.$emit('setResponseAlerts', null)
      }
    },
    'countProducts' (value) {
      this.$emit('setCountProducts', value)
    }
  },
  mounted () {
    this.getCart()

    this.$store.dispatch('breadcrumbs/setBreadcrumbs', [
      { linkName: this.$t('link.cart') }
    ])
  },
  methods: {
    emitSetResponseAlerts (value) {
      this.$emit('setResponseAlerts', value)
    },
    emitSetResponseClassAlerts (value) {
      this.$emit('setResponseClassAlerts', value)
    },
    getCart () {
      axios.post('/cart/get', {
        cart_key: this.CART_KEY
      }).then((res) => {
        this.products = res.data.products
        this.cartProducts = res.data.cart_products

        this.setTotalData()

        const idProducts = this.products.map((el) => { return el.id })
        this.$store.dispatch('cart/updateIdProducts', idProducts)

        if (!res.data.products.length) {
          this.$emit('setResponseAlerts', this.$t('message.empty_cart'))
          this.$emit('setResponseClassAlerts', 'alert-primary')
        } else {
          this.$emit('setResponseAlerts', null)
        }
      })
    },
    setTotalData () {
      this.countProducts = this.totalPrice = this.discount = this.forPayment = 0

      this.cartProducts.forEach((item) => {
        this.countProducts += item.quantity
      })

      let totalDiscount = 0
      this.products.forEach((product) => {
        const cartProduct = this.getCartProduct(product.id)
        this.totalPrice += (product.uah_old_price > 0)
          ? product.uah_old_price
          : product.uah_price * cartProduct.quantity
        totalDiscount += product.uah_price * cartProduct.quantity
        this.forPayment += product.uah_price * cartProduct.quantity
      })
      this.discount = Math.abs(totalDiscount - this.totalPrice)
    },
    getCartProduct (productId) {
      return this.cartProducts.find(item => item.product_id === productId)
    },
    getTotalPrice (productId, price) {
      const quantity = this.getCartProduct(productId).quantity

      return price * quantity
    },
    deleteProduct (id) {
      this.$store.dispatch('cart/remove', {
        productId: id,
        cartKey: this.CART_KEY
      }).then(() => {
        this.products = _.filter(this.products, (el) => {
          return el.id !== id
        })
        this.cartProducts = _.filter(this.cartProducts, (el) => {
          return el.product_id !== id
        })
        this.setTotalData()
        this.$store.dispatch('cart/decreaseValueCount')
      })
    }
  }
}
</script>

<style scoped>
.availability_minus {
  color: red;
}
</style>
