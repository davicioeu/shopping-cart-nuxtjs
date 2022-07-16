<template>
  <fragment>
    <section v-scroll="handleScroll" class="cart">
      <div class="container">
        <Alerts
          :prop-alerts="responseAlerts"
          :prop-class-alert="responseClassAlerts"
          @resetAlerts="resetAlerts"
        />

        <ProductList
          :add-class-after-scroll="addClassAfterScroll"
          @setResponseAlerts="setResponseAlerts"
          @setResponseClassAlerts="setResponseClassAlerts"
          @setCountProducts="setCountProducts"
        />

        <div class="row shop_manage">
          <nuxt-link :to="{ name: 'catalog' }">
            <button
              class="more_shopping"
            >
              {{ $t('link.continue_shopping') }}
            </button>
          </nuxt-link>
          <button
            v-if="countProducts > 0"
            class="issue"
          >
            {{ $t('link.go_to_checkout') }}
          </button>
        </div>
      </div>
    </section>

    <Recommendation />
  </fragment>
</template>

<script>
import ProductList from '../components/cart/ProductList'
import scrollDirective from '../mixins/scrollDirective'
import Recommendation from '../components/Recommendation'
import Alerts from '../components/Alerts'

export default {
  name: 'Cart',
  components: {
    Alerts,
    ProductList,
    Recommendation
  },
  mixins: [scrollDirective],
  data () {
    return {
      addClassAfterScroll: false,
      responseAlerts: null,
      responseClassAlerts: 'alert-primary',
      countProducts: 0
    }
  },
  methods: {
    resetAlerts () {
      this.responseAlerts = null
    },
    // eslint-disable-next-line
    handleScroll: function (evt, el) {
      this.addClassAfterScroll = window.scrollY >= 150 && window.scrollY <= 1230
    },
    setResponseAlerts (value) {
      this.responseAlerts = value
    },
    setResponseClassAlerts (value) {
      this.responseClassAlerts = value
    },
    setCountProducts (value) {
      this.countProducts = value
    }
  }
}
</script>
