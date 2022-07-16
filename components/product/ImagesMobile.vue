<template>
  <div class="product-image-gallery-mobile">
    <div class="row">
      <div class="owl-carousel owl-theme prodImageMobileSlider">
        <div
          v-for="(item, index) in images"
          :key="`image-mobile-${item.id}`"
          class="item"
        >
          <img
            :src="getUrlImg(`products/${item.image_origin}`)"
            alt=""
            @click="clickImage(item, index)"
          >
        </div>
      </div>
    </div>
    <div class="row ss_row">
      <div class="owl-controls prodImageMobileDots">
        <ul class="owl-dots prodImageMobileCustomDots">
          <li v-for="(item, index) in images"
              :key="item.id"
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
</template>

<script>
import owlCarousel from '../../mixins/owlCarousel'
import productImageMixin from '../../mixins/productImageMixin'

export default {
  name: 'ImagesMobile',
  mixins: [owlCarousel, productImageMixin],
  watch: {
    'images' () {
      this.initCarousel()
    }
  },
  mounted () {
    this.initCarousel()
  },
  methods: {
    initCarousel () {
      setTimeout(() => {
        // eslint-disable-next-line
        $('.prodImageMobileSlider').owlCarousel({
          loop: false,
          rewind: true,
          animateIn: 'fadeIn',
          animateOut: 'fadeOut',
          dotsContainer: '.prodImageMobileCustomDots',
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

        this.initOwlClickDots('.prodImageMobileSlider', '.owl-dot', 'to.owl.carousel')
      }, 1000)
    }
  }
}
</script>
