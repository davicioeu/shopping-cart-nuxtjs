<template>
  <section class="mainslider">
    <div class="container submenu_container">
      <div class="row sub_menu">
        <ul class="categories">
          <li
            v-for="category in categories"
            :key="category.id"
          >
            <nuxt-link
              :class="(checkActiveCategory(category.slug)) ? 'active-category' : ''"
              :to="{ name: 'category', params: { slug: category.slug }, query: { sort: 'name', q: '', page: 1 } }"
              @click.native="clickCategory"
            >
              {{ category.name }}
            </nuxt-link>
          </li>

          <li>
            <nuxt-link
              :class="this.$router.currentRoute.name === 'products' ? 'active-category' : ''"
              :to="{ name: 'products', query: { sort: 'name', q: '', page: 1 } }"
              @click.native="clickCategory"
            >
              {{ $t('text.all_products') }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <template v-if="$nuxt.$route.name === 'index'">
      <div
        class="container mySlider_fullscreen"
        :style="'--img: url(\'/images/main-bg.png\')'"
      >
        <div class="row fs_row">
          <div class="main_info">
            <div v-html="text.description" />
            <nuxt-link :to="{ name: 'catalog' }" class="goto">
              {{ $t('link.goto_catalog') }}
            </nuxt-link>
          </div>
          <div v-if="sliderItems.length" class="owl-controls mainSliderDots">
            <ul class="owl-dots mainSliderCustomDots">
              <li v-for="(slide, index) in sliderItems"
                  :key="slide.id"
                  :data="index"
                  :class="(index === 0) ? 'owl-dot active' : 'owl-dot'"
              >
                <template v-if="index < 10">
                  {{ `0${index+1}` }}
                </template>
                <template v-else>
                  {{ index+1 }}
                </template>
              </li>
            </ul>
          </div>
          <div class="main_slider">
            <div class="owl-carousel owl-theme mainSlider">
              <div v-for="slide in sliderItems"
                   :key="slide.id"
                   class="item"
              >
                <img :src="getUrlImg(`slider/${slide.image_origin}`)"
                     alt=""
                     @click="openUrlSlide(slide)"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import imageMixin from '../mixins/imageMixin'
import owlCarousel from '../mixins/owlCarousel'
import urlMixin from '../mixins/urlMixin'

export default {
  name: 'CategoriesAndMainSlider',
  mixins: [owlCarousel, imageMixin, urlMixin],
  data: () => ({
    routeName: null,
    categories: [],
    text: {
      description: null
    },
    sliderItems: []
  }),
  computed: mapGetters({
    LOAD_DATA: 'commonData/loadData',
    CATEGORIES: 'commonData/categories',
    TEXT_PAGES: 'commonData/textPages',
    SLIDER_ITEMS: 'commonData/sliderItems'
  }),
  watch: {
    $route () {
      this.routeName = this.$route.name
    },
    'LOAD_DATA' () {
      this.setData()
    }
  },
  mounted () {
    this.routeName = this.$route.name
    if (this.LOAD_DATA) {
      this.setData()
      this.initCarousel()
    }
  },
  updated () {
    this.initCarousel()
  },
  methods: {
    checkActiveCategory (slug) {
      return this.$router.currentRoute.name === 'category' && this.$router.currentRoute.params.slug === slug
    },
    initCarousel () {
      if (this.routeName === 'index') {
        /* eslint-disable-next-line */
        $('.mainSlider').owlCarousel({
          loop: false,
          rewind: true,
          animateIn: 'fadeIn',
          animateOut: 'fadeOut',
          dotsContainer: '.mainSliderCustomDots',
          autoplay: true,
          autoplayTimeout: 10000,
          center: true,
          margin: 10,
          dots: true,
          responsive: {
            0: {
              items: 1
            },
            500: {
              items: 1
            },
            900: {
              items: 1
            },
            1200: {
              items: 1
            },
            1920: {
              items: 1
            }
          }
        })

        this.initOwlClickDots('.mainSlider', '.owl-dot', 'to.owl.carousel')
      }
    },
    setData () {
      this.categories = this.CATEGORIES.filter(item => item.show_in_header)
      this.sliderItems = this.SLIDER_ITEMS.filter(el => el.block === 1)
      const index = this.TEXT_PAGES.findIndex(el => el.slug === 'about_catalog_index')
      if (index !== -1) {
        this.text = this.TEXT_PAGES.find(el => el.slug === 'about_catalog_index')
      }
    },
    clickCategory () {
      this.$store.dispatch('products/runGetProducts')
    }
  }
}
</script>

<style scoped>
  .active-category {
    border-top: 3px solid #BD4F50;
  }
  .sub_menu .categories:before {
    top: 0;
    left: 0;
    border-top: 0;
  }
</style>
