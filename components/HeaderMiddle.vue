<template>
  <header :class="(stickyMenu) ? 'sticky-menu middle' : 'middle'">
    <div class="container">
      <div class="row middle_line">
        <nuxt-link :to="{ name: 'index' }">
          <img class="logo" :src="logo" alt="">
        </nuxt-link>
        <form action="javascript:void(0)" class="search justify-content-center">
          <input
            v-model="textSearchProduct"
            class="top_search"
            type="text"
            :placeholder="searchPlaceholder"
          >
          <button
            class="top_search_confirm"
            @click="searchProducts"
          >
            <img src="/images/search_btn.png"
                 alt=""
                 class="search_btn"
            >
          </button>
          <button class="search_btn_mobile"
                  data-fancybox
                  data-src="#hidden-content"
                  href="javascript:;"
          >
            <img src="/images/search_btn.png"
                 alt=""
                 class="btn_mobile"
            >
          </button>
        </form>
        <ul class="my_cart">
          <li class="heart_block">
            <nuxt-link :to="{ name: 'UserFavorite' }">
              <img class="heart" src="/images/heart.png" alt="">
              <span
                v-if="favoriteCountProducts > 0"
                class="badge"
                v-text="favoriteCountProducts"
              ></span>
            </nuxt-link>
          </li>
          <li class="cart_block">
            <nuxt-link :to="{ name: 'cart' }">
              <img class="cart" src="/images/cart.png" alt="">
              <span
                v-if="cartCountProducts > 0"
                class="badge"
                v-text="cartCountProducts"
              >
              </span>
            </nuxt-link>
          </li>
        </ul>
        <button class="my_cabinet trigger" @click="openAuthModal">
          {{ linkPersonalAccount }}
        </button>

        <div class="phone_rec">
          <button class="phone_btn"
                  @click="openSidePanel('myOpenphone')"
          >
            <img src="/images/phone-receiver.png" alt="">
          </button>
        </div>
        <div id="myOpenphone" class="sidepanel">
          <a href="javascript:void(0)"
             class="closebtn"
             @click="closeSidePanel('myOpenphone')"
          >&times;</a>
          <div class="language">
            <template v-for="(value, index) in LOCALES">
              <a :key="`link-${index}`"
                 href="javascript:void(0)"
                 style="text-transform: uppercase"
                 :class="(LOCALE === index) ? `${index} active` : value"
                 @click.prevent="setLocale(index)"
              >
                {{ value }}
              </a>
              <span v-if="!checkLastElement(index)" :key="`span-${index}`">|</span>
            </template>
          </div>
          <a class="the_menu cont">{{ $t('link.contacts') }}</a>
          <a v-if="tel1 !== null"
             class="the_menu"
             :href="`tel:${tel1}`"
             v-text="tel1"
          >
            {{ tel1 }}
          </a>
          <a v-if="tel2 !== null"
             class="the_menu"
             :href="`tel:${tel2}`"
             v-text="tel2"
          >
            {{ tel2 }}
          </a>
          <a class="the_menu work">{{ $t('text.schedule') }}</a>
          <a class="the_menu" v-text="schedule" />
        </div>

        <div class="hamburger">
          <button
            class="openbtn"
            @click="openSidePanel('mySidepanel')"
            v-html="htmlSidePanelImg"
          />
        </div>

        <SidePanel
          :html-side-panel-img="htmlSidePanelImg"
          @openAuthModal="openAuthModal"
        />

        <Auth
          v-if="!AUTH_CHECK"
          :show-auth-modal="showAuthModal"
          @closeAuthModal="closeAuthModal"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import setting from '../mixins/setting'
import sidePanel from '../mixins/sidePanel'
import imageMixin from '../mixins/imageMixin'
import SidePanel from './SidePanel'
import { loadMessages } from './../plugins/i18n'
import Auth from './modals/Auth'

export default {
  name: 'HeaderMiddle',
  comments: {
    Auth
  },
  components: { Auth, SidePanel },
  mixins: [sidePanel, setting, imageMixin],
  props: ['stickyMenu'],
  data () {
    return {
      showAuthModal: false,
      tel1: null,
      tel2: null,
      schedule: null,
      logo: null,
      searchPlaceholder: this.$t('text.search'),
      linkPersonalAccount: this.$t('link.personal_account'),
      favoriteCountProducts: 0,
      cartCountProducts: 0,
      textSearchProduct: '',
      htmlSidePanelImg: '<img src="/images/hamburger.png" alt="">'
    }
  },
  computed: mapGetters({
    LOCALE: 'lang/locale',
    LOCALES: 'lang/locales',
    SETTINGS: 'commonData/settings',
    LOAD_DATA: 'commonData/loadData',
    AUTH_USER: 'auth/user',
    AUTH_CHECK: 'auth/check',
    FAVORITE_COUNT_PRODUCTS: 'favoriteProducts/count',
    CART_COUNT_PRODUCTS: 'cart/count'
  }),
  watch: {
    'LOAD_DATA' () {
      this.setData()
    },
    'AUTH_CHECK' (authCheck) {
      if (authCheck) {
        this.setDataForAuth()
      }
    },
    'AUTH_USER' () {
      this.setDataForAuth()
    },
    'FAVORITE_COUNT_PRODUCTS' (count) {
      this.favoriteCountProducts = count
    },
    'CART_COUNT_PRODUCTS' (count) {
      this.cartCountProducts = count
    },
    '$route.query' () {
      this.setTextSearchProducts()
    }
  },
  mounted () {
    if (this.AUTH_CHECK) {
      this.setDataForAuth()
    }
  },
  methods: {
    searchProducts () {
      let sort = 'name'
      if (typeof this.$route.query.sort !== 'undefined') {
        sort = this.$route.query.sort
      }

      this.$router.push({
        name: 'products',
        query: {
          q: this.textSearchProduct,
          sort
        }
      })

      this.$store.dispatch('products/runGetProducts')
    },
    setDataForAuth () {
      this.linkPersonalAccount = `${this.AUTH_USER.user_name} ${this.AUTH_USER.user_surname}`
    },
    setTextSearchProducts () {
      if (typeof this.$route.query.q !== 'undefined') {
        this.textSearchProduct = this.$route.query.q
      } else {
        this.textSearchProduct = ''
      }
    },
    setData () {
      this.setTextSearchProducts()

      this.tel1 = this.getSettingItem('tel1').parent_value
      this.tel2 = this.getSettingItem('tel2').parent_value
      this.schedule = this.getSettingItem('schedule').value.replace(/<[^>]*>?/gm, '')

      this.logo = this.getUrlImg(`logo/${this.getSettingItem('logo').parent_value}`)

      this.favoriteCountProducts = this.FAVORITE_COUNT_PRODUCTS
      this.cartCountProducts = this.CART_COUNT_PRODUCTS
    },
    openAuthModal () {
      if (this.AUTH_CHECK) {
        this.$router.push({ name: 'UserContactInformation' })
      } else {
        this.showAuthModal = true
      }
    },
    closeAuthModal () {
      this.showAuthModal = false
    },
    checkLastElement (index) {
      return (Object.keys(this.LOCALES)[Object.keys(this.LOCALES).length - 1] === index)
    },
    setLocale (locale) {
      if (this.$i18n.locale !== locale) {
        loadMessages(locale)

        this.$router.push({ params: { lang: locale } })

        this.$store.dispatch('lang/setLocale', { locale })
      }
    }
  }
}
</script>
