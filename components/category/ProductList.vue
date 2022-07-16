<template>
  <div class="items">
    <Sorting @getProducts="getProducts" />

    <Alerts
      :prop-alerts="responseAlerts"
      :prop-class-alert="responseClassAlerts"
      @resetAlerts="resetAlerts"
    />

    <div id="template_list_products" class="row cat_items">
      <template v-for="product in PRODUCTS">
        <RenderItem
          :key="`catalog-product-${product.id}`"
          :product-item="product"
        />
      </template>
    </div>

    <Pagination
      @showMoreProducts="showMoreProducts"
      @pageChange="pageChange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RenderItem from '../product/RenderItem'
import Alerts from '../Alerts'
import Sorting from './Sorting'
import Pagination from './../Pagination'

export default {
  name: 'ProductList',
  components: {
    Alerts,
    RenderItem,
    Pagination,
    Sorting
  },
  data: () => ({
    slug: null,
    responseAlerts: null,
    responseClassAlerts: ''
  }),
  computed: mapGetters({
    PRODUCTS: 'products/products',
    PAGINATION: 'products/pagination',
    CATEGORY_SLUG: 'products/categorySlug',
    RUN_GET_PRODUCTS: 'products/runGetProducts',
    FULL_PATH: 'products/fullPath',
    VIEW_PRODUCT_ID: 'products/viewProductId'
  }),
  watch: {
    'RUN_GET_PRODUCTS' () {
      this.getProducts()
    }
  },
  mounted () {
    this.handlerGetProducts()
  },
  methods: {
    resetAlerts () {
      this.responseAlerts = null
    },
    showMoreProducts () {
      const currentPage = this.PAGINATION.currentPage
      const totalPages = this.PAGINATION.totalPages
      if (currentPage + 1 <= totalPages) {
        this.$router.push({ query: Object.assign(
          {}, this.$route.query, { page: currentPage + 1 }
        ) })
        this.getProducts(currentPage + 1, true)
      }
    },
    pageChange (page) {
      this.getProducts(page)
    },
    getProducts (page = 1, addToCurrentProducts = false) {
      setTimeout(() => {
        this.$store.dispatch('products/fullPath', this.$route.fullPath)

        const queryPage = this.$route.query.page
        if (queryPage !== undefined) {
          page = (parseInt(page) !== parseInt(queryPage)) ? queryPage : parseInt(page)
        }

        let filters = this.$route.query.filters
        if (filters === undefined) {
          filters = []
        } else if (Array.isArray(filters)) {
          filters = filters.map(Number)
        } else {
          filters = [filters]
        }

        let sort = 'name'
        if (typeof this.$route.query.sort !== 'undefined') {
          sort = this.$route.query.sort
        }

        let q = ''
        if (typeof this.$route.query.q !== 'undefined') {
          q = this.$route.query.q
        }

        this.$store.dispatch('products/get', {
          categorySlug: this.slug,
          filters,
          page,
          addToCurrentProducts,
          sort,
          q
        }).then((res) => {
          if (res.products.data.length === 0) {
            this.responseAlerts = this.$t('message.no_data_on_request')
            this.responseClassAlerts = 'alert-primary'
          } else {
            this.responseAlerts = null
          }

          if (!addToCurrentProducts) {
            this.$scrollTo('#header')
          }
        }).catch((err) => {
          this.$log.error(err)
          if (typeof err.response !== 'undefined' && err.response.status === 422) {
            this.responseAlerts = err.response.data.errors
            this.responseClassAlerts = 'alert-danger'
          }
        })
      }, 500)
    },
    handlerGetProducts () {
      this.slug = this.$route.params.slug
      if (this.CATEGORY_SLUG === null) {
        this.getProducts()
      } else if (this.$route.fullPath !== this.FULL_PATH) {
        this.getProducts()
      } else if (this.VIEW_PRODUCT_ID !== null &&
        this.PRODUCTS.findIndex(el => el.id === this.VIEW_PRODUCT_ID) !== -1) {
        setTimeout(() => {
          this.$scrollTo(`#product-render-item-${this.VIEW_PRODUCT_ID}`, {
            offset: -100,
            force: false
          })
        }, 500)
      }
    }
  }
}
</script>
