<template>
  <div v-scroll="handleScroll">
    <client-only>
      <notifications style="margin-top: 100px"></notifications>
    </client-only>

    <button id="toTop"
            v-scroll-to="'#header'"
            :style="(btnScrollToTop) ? 'display:block' : 'display:none'"
            class="toTop"
    >
      <i class="fas fa-chevron-up" />
    </button>

    <Header />

    <HeaderMiddle :sticky-menu="stickyMenu" />

    <CategoriesAndMainSlider />

    <Breadcrumbs />

    <nuxt />

    <FAQ />

    <FAQMobile />

    <Footer />

    <SearchMobile />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import scrollDirective from '../mixins/scrollDirective'
import jqueryBadBad from '../mixins/jqueryBadBad'
import Header from '../components/Header'
import HeaderMiddle from '../components/HeaderMiddle'
import CategoriesAndMainSlider from '../components/CategoriesAndMainSlider'
import Breadcrumbs from '../components/Breadcrumbs'
import FAQ from '../components/FAQ'
import FAQMobile from '../components/FAQMobile'
import Footer from '../components/Footer'
import SearchMobile from '../components/modals/SearchMobile'

export default {
  name: 'App',
  components: {
    SearchMobile,
    Footer,
    FAQMobile,
    FAQ,
    Breadcrumbs,
    CategoriesAndMainSlider,
    HeaderMiddle,
    Header
  },
  mixins: [scrollDirective, jqueryBadBad],
  data () {
    return {
      stickyMenu: false,
      btnScrollToTop: false
    }
  },
  computed: mapGetters({
    loadData: 'commonData/loadData',
    textPage: 'commonData/textPage',
    pages: 'commonData/pages',
    socialNetworks: 'commonData/socialNetworks',
    sliderItems: 'commonData/sliderItems',
    partners: 'commonData/partners'
  }),
  mounted () {
    if (!this.loadData) {
      this.$store.dispatch('commonData/startApp').then((res) => {
        this.$store.dispatch('favoriteProducts/updateFavoriteData', {
          key: res.favorite_key,
          count: res.favorite_count_products
        })

        this.$store.dispatch('cart/updateCartData', {
          key: res.cart_key,
          count: res.cart_count_products
        })
      })
    }
  },
  methods: {
    handleScroll (evt, el) {
      this.stickyMenu = window.scrollY >= 120
      this.btnScrollToTop = window.scrollY > 200
    }
  }
}
</script>
