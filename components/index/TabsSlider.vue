<template>
  <section
    v-if="hitProducts.length || discountProducts.length || newProducts.length"
    class="tabs_slider"
  >
    <div class="container">
      <div class="row">
        <div class="row title_block">
          <h2>
            {{ $t('text.frequent_requests') }}
          </h2>
        </div>
      </div>
      <div class="tab-slider--nav">
        <ul class="tab-slider--tabs">
          <li
            v-if="hitProducts.length"
            :class="hitProducts.length ? 'tab-slider--trigger active' : 'tab-slider--trigger'"
            rel="tab1"
          >
            {{ $t('text.hits') }}
          </li>

          <li
            v-if="newProducts.length"
            :class="hitProducts.length === 0 ? 'tab-slider--trigger active' : 'tab-slider--trigger'"
            rel="tab2"
          >
            {{ $t('text.new_products') }}
          </li>

          <li
            v-if="discountProducts.length"
            :class="hitProducts.length === 0 && newProducts.length === 0 ? 'tab-slider--trigger active' : 'tab-slider--trigger'"
            rel="tab3"
          >
            {{ $t('text.discount_products') }}
          </li>
        </ul>
      </div>
      <div class="tab-slider--container">
        <div v-if="hitProducts.length"
             id="tab1"
             class="tab-slider--body"
        >
          <div class="owl-controls">
            <ul class="owl-nav">
              <li>
                <nuxt-link
                  :to="{ name: 'products', query: { sort: 'is_hit' } }"
                  class="seeall"
                >
                  {{ $t('link.all_products') }}
                </nuxt-link>
              </li>
              <li class="prevBtn" v-text="'<'"></li>
              <li class="nextBtn" v-text="'>'"></li>
            </ul>
          </div>
          <div class="owl-carousel owl-theme hitsSlider">
            <template v-for="product in hitProducts">
              <RenderItem
                :key="`product-hit-tab-${product.id}`"
                :product-item="product"
              />
            </template>
          </div>
        </div>

        <div
          id="tab2"
          class="tab-slider--body"
        >
          <div class="owl-controls">
            <ul class="owl-nav">
              <li>
                <nuxt-link
                  :to="{ name: 'products', query: { sort: 'new_products' } }"
                  class="seeall"
                >
                  {{ $t('link.all_products') }}
                </nuxt-link>
              </li>
              <li class="prevBtn" v-text="'<'"></li>
              <li class="nextBtn" v-text="'>'"></li>
            </ul>
          </div>
          <div class="owl-carousel owl-theme hitsSlider">
            <template v-for="product in newProducts">
              <RenderItem
                :key="`product-new-item-tab-${product.id}`"
                :product-item="product"
              />
            </template>
          </div>
        </div>

        <div
          id="tab3"
          class="tab-slider--body"
        >
          <div class="owl-controls">
            <ul class="owl-nav">
              <li>
                <nuxt-link
                  :to="{ name: 'products', query: { sort: 'discount_products' } }"
                  class="seeall"
                >
                  {{ $t('link.all_products') }}
                </nuxt-link>
              </li>
              <li class="prevBtn" v-text="'<'"></li>
              <li class="nextBtn" v-text="'>'"></li>
            </ul>
          </div>
          <div class="owl-carousel owl-theme hitsSlider">
            <template v-for="product in discountProducts">
              <RenderItem
                :key="`product-discount-tab-${product.id}`"
                :product-item="product"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import RenderItem from '../product/RenderItem'

export default {
  name: 'TabsSlider',
  components: {
    RenderItem
  },
  data: () => ({
    hitProducts: [],
    discountProducts: [],
    newProducts: []
  }),
  computed: mapGetters({
    HIT_PRODUCTS: 'commonData/hitProducts',
    DISCOUNT_PRODUCTS: 'commonData/discountProducts',
    NEW_PRODUCTS: 'commonData/newProducts',
    LOAD_DATA: 'commonData/loadData'
  }),
  watch: {
    'LOAD_DATA' () {
      this.setData()
    }
  },
  mounted () {
    if (this.LOAD_DATA) {
      this.setData()
      this.initCarousel()
    }
  },
  updated () {
    this.initCarousel()
  },
  methods: {
    initCarousel () {
      setTimeout(() => {
        // eslint-disable-next-line
        $('.tab-slider--body').hide();
        // eslint-disable-next-line
        $('.tab-slider--body:first').show();
        // eslint-disable-next-line
        $('.tab-slider--nav li').click(function() {
          // eslint-disable-next-line
          $('.tab-slider--body').hide()
          // eslint-disable-next-line
          let activeTab = $(this).attr('rel')
          // eslint-disable-next-line
          $('#'+activeTab).fadeIn()
          // eslint-disable-next-line
          $('.tab-slider--nav li').removeClass('active')
          // eslint-disable-next-line
          $(this).addClass('active')
        })

        // eslint-disable-next-line
        $('.hitsSlider').owlCarousel({
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
        // eslint-disable-next-line
        let hitsSlider = $('.hitsSlider');
        // eslint-disable-next-line
        hitsSlider.owlCarousel();
        // eslint-disable-next-line
        $('.nextBtn').click(function() {
          hitsSlider.trigger('next.owl.carousel')
        })
        // eslint-disable-next-line
        $('.prevBtn').click(function() {
          hitsSlider.trigger('prev.owl.carousel', [300])
        })
      }, 1500)
    },
    setData () {
      this.hitProducts = this.HIT_PRODUCTS
      this.discountProducts = this.DISCOUNT_PRODUCTS
      this.newProducts = this.NEW_PRODUCTS
    }
  }
}
</script>
