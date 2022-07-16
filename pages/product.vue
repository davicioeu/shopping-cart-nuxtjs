<template>
  <div>
    <client-only>
      <gallery :images="galleryImages" :index="index" @close="index = null" />
    </client-only>

    <section class="product_card">
      <div class="container">
        <div class="row prod_info">
          <Images
            :images="product.images"
            :main-image="product.main_image"
            @changeGalleryImages="changeGalleryImages"
            @changeImageIndex="changeImageIndex"
          />

          <div class="product-price-information">
            <Info
              :product-item="product"
              :avg-reviews="avgReviews"
            />

            <ImagesMobile
              :images="product.images"
              :main-image="product.main_image"
              @changeGalleryImages="changeGalleryImages"
              @changeImageIndex="changeImageIndex"
            />

            <ParametersTop :top-filters="topFilters" />

            <BuyAndQuestion :product="product" />
          </div>
        </div>

        <client-only>
          <div class="row prod_desc">
            <DescriptionAndParameters
              :product-filters="product.filters"
              :product-description="product.description"
            />

            <Reviews
              :product-id="product.id"
              @changeAvgReviews="changeAvgReviews"
            />
          </div>
        </client-only>
      </div>
    </section>

    <Recommendation />
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Images from '../components/product/Images'
import Recommendation from '../components/Recommendation'
import ImagesMobile from '../components/product/ImagesMobile'
import ParametersTop from '../components/product/ParametersTop'
import BuyAndQuestion from '../components/product/BuyAndQuestion'
import DescriptionAndParameters from '../components/product/DescriptionAndParameters'
import Reviews from '../components/product/Reviews'
import Info from '../components/product/Info'
import metaMixin from '../mixins/metaMixin'

export default {
  name: 'Product',
  components: {
    Info,
    Reviews,
    DescriptionAndParameters,
    BuyAndQuestion,
    ParametersTop,
    ImagesMobile,
    Recommendation,
    Images
  },
  mixins: [metaMixin],
  data: () => ({
    product: {
      id: null,
      main_category_id: null,
      article: '',
      name: '',
      slug: '',
      price: 0,
      old_price: null,
      main_image: {
        id: null,
        image_origin: '',
        image_preview: '',
        sorting_order: 0
      },
      main_filter_item: {
        name: ''
      },
      filters: [],
      images: [],
      description: '',
      m_title: '',
      m_description: '',
      m_keywords: ''
    },
    galleryImages: [],
    index: null,
    topFilters: [],
    avgReviews: 0
  }),
  computed: mapGetters({
    PRODUCTS: 'products/products',
    FILTERS: 'commonData/filters',
    LOAD_DATA: 'commonData/loadData',
    LAST_CATEGORY_VIEW: 'commonData/lastCategoryView',
    CATEGORIES: 'commonData/categories'
  }),
  watch: {
    'LOAD_DATA' () {
      this.handlerSetData()
    },
    'product' () {
      this.$store.dispatch('products/updateViewProductId', this.product.id)
    }
  },
  head () {
    return this.getMetaTags(this.product)
  },
  async asyncData ({ store, route, params, error }) {
    const data = {
      product: {
        id: null,
        main_category_id: null,
        article: '',
        name: '',
        slug: '',
        price: 0,
        old_price: null,
        main_image: {
          id: null,
          image_origin: '',
          image_preview: '',
          sorting_order: 0
        },
        main_filter_item: {
          name: ''
        },
        filters: [],
        images: [],
        description: '',
        m_title: '',
        m_description: '',
        m_keywords: ''
      },
      galleryImages: [],
      index: null,
      topFilters: [],
      avgReviews: 0
    }

    if (process.server && typeof params.product_slug !== 'undefined') {
      const apiFilters = await axios.post('/filters/get')
      const apiProduct = await axios.post('/product/view', {
        'slug': params.product_slug
      })

      if (typeof apiProduct.data !== 'undefined') {
        data.product = apiProduct.data.product
        data.topFilters = data.product.filters.filter((filter) => {
          const parentFilter = apiFilters.data.filters.find(el => el.id === filter.filter_id)
          if (parentFilter !== undefined) {
            return parentFilter.show_in_brief_product_info === 1
          }
        })

        store.dispatch('breadcrumbs/setBreadcrumbs', [
          { linkName: data.product.name }
        ])
      }

      return data
    }

    return data
  },
  mounted () {
    this.handlerSetData()
  },
  methods: {
    changeAvgReviews (value) {
      this.avgReviews = value
    },
    setToFilters () {
      this.topFilters = this.product.filters.filter((filter) => {
        const parentFilter = this.FILTERS.find(el => el.id === filter.filter_id)
        if (parentFilter !== undefined) {
          return parentFilter.show_in_brief_product_info === 1
        }
      })
    },
    changeGalleryImages (images) {
      this.galleryImages = images
    },
    changeImageIndex (index) {
      this.index = index
    },
    setData () {
      this.setBreadcrumbs()
      this.setToFilters()
    },
    setBreadcrumbs () {
      const breadcrumbs = []
      breadcrumbs.push({
        routeName: 'catalog',
        linkName: this.$t('link.catalog')
      })

      if (this.LAST_CATEGORY_VIEW !== null) {
        breadcrumbs.push({
          routeBack: true,
          linkName: this.LAST_CATEGORY_VIEW.name
        })
      } else {
        const category = this.CATEGORIES.find(item => item.id === this.product.main_category_id)
        breadcrumbs.push({
          routeObject: { name: 'category', params: { slug: category.slug } },
          linkName: category.name
        })
      }

      breadcrumbs.push({
        linkName: this.product.name
      })

      this.$store.dispatch('breadcrumbs/setBreadcrumbs', breadcrumbs)
    },
    apiProductView (slug) {
      this.$store.dispatch('products/view', { slug }).then((res) => {
        this.product = res.product
        this.setData()
      })
    },
    handlerSetData () {
      if (this.LOAD_DATA) {
        const slug = this.$route.params.product_slug
        if (this.PRODUCTS.length && slug.length) {
          const index = this.PRODUCTS.findIndex(el => el.slug === slug)
          if (index !== -1) {
            this.product = this.PRODUCTS.find(el => el.slug === slug)
            this.setData()
          } else {
            this.apiProductView(slug)
          }
        }

        if (this.product.id === null) {
          this.apiProductView(slug)
        }
      }
    }
  }
}
</script>
