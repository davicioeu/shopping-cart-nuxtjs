<template>
  <section class="sale_slider">
    <div class="container">
      <div class="row">
        <div class="owl-carousel owl-theme saleSlider">
          <div
            v-for="slide in sliderItems"
            :key="slide.id"
            class="item"
          >
            <img
              :src="getUrlImg(`slider/${slide.image_origin}`)"
              alt=""
              @click="openUrlSlide(slide)"
            >
          </div>
        </div>
      </div>
      <div class="row ss_row">
        <div v-if="sliderItems.length" class="owl-controls saleSliderDots">
          <ul class="owl-dots saleSliderCustomDots">
            <li
              v-for="(slide, index) in sliderItems"
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
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import imageMixin from '../../mixins/imageMixin'
import owlCarousel from '../../mixins/owlCarousel'
import urlMixin from '../../mixins/urlMixin'

export default {
  name: 'SaleSlider',
  mixins: [owlCarousel, imageMixin, urlMixin],
  data: () => ({
    sliderItems: []
  }),
  computed: mapGetters({
    LOAD_DATA: 'commonData/loadData',
    SLIDER_ITEMS: 'commonData/sliderItems'
  }),
  watch: {
    'LOAD_DATA' () {
      this.setData()
    }
  },
  mounted () {
    if (this.LOAD_DATA) {
      this.setData()
    }
  },
  methods: {
    initCarousel () {
      /* eslint-disable-next-line */
      $('.saleSlider').owlCarousel({
        loop: false,
        rewind: true,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        dotsContainer: '.saleSliderCustomDots',
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
      this.initOwlClickDots('.saleSlider', '.owl-dot', 'to.owl.carousel')
    },
    setData () {
      this.sliderItems = this.SLIDER_ITEMS.filter(el => el.block === 2)
      setTimeout(() => {
        this.initCarousel()
      }, 800)
    }
  }
}
</script>
