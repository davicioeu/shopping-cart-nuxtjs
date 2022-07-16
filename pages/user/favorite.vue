<template>
  <section class="contact_information favourite_mobile">
    <div class="container">
      <div class="row">
        <Links :block-classes="'contact_btns'" />

        <div class="favorites">
          <h2>
            {{ $t('link.favorite') }}
          </h2>

          <Alerts
            style="margin-top: 20px"
            :prop-alerts="responseAlerts"
            :prop-class-alert="responseClassAlerts"
          />

          <div class="favorites_items">
            <template
              v-for="product in products"
            >
              <RenderItem
                :key="`favorite-product-${product.id}`"
                :show-delete-favorite-btn="true"
                :product-item="product"
                @removeProduct="removeProduct"
              />
            </template>
          </div>
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
import RenderItem from '../../components/product/RenderItem'
import Alerts from '../../components/Alerts'

export default {
  name: 'Favorite',
  components: {
    Alerts,
    RenderItem,
    Links
  },
  head () {
    return {
      title: this.$t('link.favorite')
    }
  },
  data: () => ({
    products: [],
    responseAlerts: null,
    responseClassAlerts: 'alert-primary'
  }),
  computed: mapGetters({
    FAVORITE_KEY: 'favoriteProducts/key',
    ID_PRODUCTS: 'favoriteProducts/idProducts'
  }),
  watch: {
    'ID_PRODUCTS' (idProducts) {
      if (idProducts.length === 0) {
        this.responseAlerts = this.$t('message.no_data_on_request')
      }
    }
  },
  mounted () {
    axios.post('/favorite/get', {
      favorite_key: this.FAVORITE_KEY
    }).then((res) => {
      this.products = res.data.products
      const idProducts = this.products.map((el) => { return el.id })
      this.$store.dispatch('favoriteProducts/updateIdProducts', idProducts)
      if (!this.products.length) {
        this.responseAlerts = this.$t('message.no_data_on_request')
      }
    })

    this.$store.dispatch('breadcrumbs/setBreadcrumbs', [
      { linkName: this.$t('link.favorite') }
    ])
  },
  methods: {
    removeProduct (id) {
      this.products = _.filter(this.products, (el) => {
        return el.id !== id
      })
    }
  }
}
</script>
