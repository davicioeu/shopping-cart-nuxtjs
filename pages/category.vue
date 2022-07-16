<template>
  <fragment>
    <section class="category">
      <div class="container">
        <div class="row">
          <Filters
            @getProducts="getProducts"
            @setCategory="setCategory"
          />

          <FiltersMobile
            @getProducts="getProducts"
            @setCategory="setCategory"
          />

          <ProductList
            ref="refProductList"
          />
        </div>
      </div>
    </section>
  </fragment>
</template>

<script>
import axios from 'axios'
import Filters from '../components/category/Filters'
import FiltersMobile from '../components/category/FiltersMobile'
import ProductList from '../components/category/ProductList'
import metaMixin from '../mixins/metaMixin'

export default {
  name: 'Category',
  components: {
    ProductList,
    FiltersMobile,
    Filters
  },
  mixins: [metaMixin],
  fixScroll: true,
  head () {
    return this.getMetaTags(this.category)
  },
  data: () => ({
    category: {}
  }),
  async asyncData ({ route, params, error }) {
    const data = {
      category: {}
    }

    if (process.server && typeof params.slug !== 'undefined') {
      const apiData = await axios.post('/category', {
        'slug': params.slug
      })

      if (typeof apiData.data !== 'undefined') {
        data.category = apiData.data.category
      }

      return data
    }

    return data
  },
  methods: {
    setCategory (category) {
      this.category = category
      this.$store.dispatch('commonData/setLastCategoryView', category)
      this.$store.dispatch('breadcrumbs/setBreadcrumbs', [
        { routeName: 'catalog', linkName: this.$t('link.catalog') },
        { linkName: this.category.name }
      ])
    },
    getProducts () {
      this.$refs.refProductList.getProducts()
    }
  }
}
</script>
