<template>
  <section v-if="products.length" class="recomendation">
    <div class="container">
      <div class="row title_block">
        <h2>
          {{ $t('text.recommendation') }}
        </h2>
        <div class="owl-controls">
          <ul class="owl-nav">
            <li>
              <nuxt-link
                :to="{ name: 'products', query: { sort: 'recommended' } }"
                class="seeall"
              >
                {{ $t('link.all_products') }}
              </nuxt-link>
            </li>
            <li class="prevBtn" v-text="'<'"></li>
            <li class="nextBtn" v-text="'>'"></li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="owl-carousel owl-theme recomendationSlider">
          <template v-for="product in products">
            <RenderItem
              :key="`product-r-${product.id}`"
              :product-item="product"
            />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import owlCarousel from '../mixins/owlCarousel'
import RenderItem from './product/RenderItem'

export default {
  name: 'Recommendation',
  components: {
    RenderItem
  },
  mixins: [owlCarousel],
  data: () => ({
    products: []
  }),
  computed: mapGetters({
    RECOMMENDED_PRODUCTS: 'commonData/recommendedProducts',
    LOAD_DATA: 'commonData/loadData'
  }),
  watch: {
    'LOAD_DATA' () {
      this.setData()
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      if (this.LOAD_DATA) {
        this.products = this.RECOMMENDED_PRODUCTS

        setTimeout(() => {
          // eslint-disable-next-line
          $('.recomendationSlider').owlCarousel({
            loop: false,
            rewind: true,
            margin: 10,
            dots: false,
            responsive: {
              0: {
                items: 1
              },
              500: {
                items: 2
              },
              671: {
                items: 4
              },
              900: {
                items: 4
              },
              1200: {
                items: 4
              },
              1920: {
                items: 4
              }
            }
          })
          this.initOwlClickPrevNext(
            '.recomendationSlider',
            '.prevBtn', '.nextBtn',
            'prev.owl.carousel',
            'next.owl.carousel'
          )
        }, 800)
      }
    }
  }
}
</script>
