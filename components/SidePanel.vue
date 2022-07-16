<template>
  <div
    id="mySidepanel"
    v-click-outside="vcoConfig"
    class="sidepanel"
  >
    <a href="javascript:void(0)"
       class="closebtn"
       @click="closeSidePanel(classSidePanel)"
    >&times;</a>
    <div class="mobile_login">
      <ul>
        <li v-if="favoriteCountProducts > 0">
          <nuxt-link :to="{ name: 'UserFavorite' }">
            <img class="heart" src="/images/heart-white.png" alt="">
            <span class="badge">{{ favoriteCountProducts }}</span>
          </nuxt-link>
        </li>
        <li>
          <button class="my_cabinet_mobile trigger-mobile"
                  @click="openAuthModal"
          >
            {{ linkPersonalAccount }}
          </button>
        </li>
      </ul>
    </div>
    <div class="msp_menu">
      <p>{{ $t('text.menu') }}</p>
    </div>
    <nuxt-link :to="{ name: 'index' }" class="the_menu">
      {{ $t('link.index') }}
    </nuxt-link>

    <nuxt-link :to="{ name: 'aboutUs' }" class="the_menu">
      {{ $t('link.about_us') }}
    </nuxt-link>

    <nuxt-link :to="{ name: 'catalog' }" class="the_menu collapsible">
      {{ $t('link.catalog') }}
    </nuxt-link>

    <div class="content">
      <nuxt-link
        v-for="category in categories"
        :key="`category-sidebar-${category.id}`"
        :to="{ name: 'category', params: { slug: category.slug }, query: { sort: 'name', q: '', page: 1 } }"
        class="the_menu"
      >
        {{ category.name }}
      </nuxt-link>

      <nuxt-link
        :to="{ name: 'products', query: { sort: 'name', q: '', page: 1 } }"
        class="the_menu"
      >
        {{ $t('text.all_products') }}
      </nuxt-link>
    </div>

    <nuxt-link
      v-for="page in pages"
      :key="page.id"
      class="the_menu"
      :to="{ name: 'textPage', params: { slug: page.slug }}"
    >
      {{ page.name }}
    </nuxt-link>

    <nuxt-link :to="{ name: 'contacts' }" class="the_menu">
      {{ $t('link.contacts') }}
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sidePanel from '../mixins/sidePanel'

export default {
  name: 'SidePanel',
  mixins: [sidePanel],
  props: ['htmlSidePanelImg'],
  data () {
    return {
      pages: [],
      categories: [],
      favoriteCountProducts: 0,
      linkPersonalAccount: this.$t('link.personal_account'),
      classSidePanel: 'mySidepanel',
      vcoConfig: {
        handler: () => { this.closeSidePanel('mySidepanel') },
        middleware: this.middlewareVco,
        events: ['dblclick', 'click'],
        isActive: true
      }
    }
  },
  computed: mapGetters({
    PAGES: 'commonData/pages',
    CATEGORIES: 'commonData/categories',
    LOAD_DATA: 'commonData/loadData',
    FAVORITE_COUNT_PRODUCTS: 'favoriteProducts/count',
    AUTH_USER: 'auth/user',
    AUTH_CHECK: 'auth/check'
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
    $route () {
      this.closeSidePanel('mySidepanel')
    },
    'FAVORITE_COUNT_PRODUCTS' (count) {
      this.favoriteCountProducts = count
    }
  },
  mounted () {
    if (this.AUTH_CHECK) {
      this.setDataForAuth()
    }
  },
  methods: {
    middlewareVco (event, el) {
      const widthSidePanel = document.getElementById(this.classSidePanel).style.width
      const targetHtml = event.target.outerHTML

      if (widthSidePanel.length > 0 && targetHtml !== this.htmlSidePanelImg) {
        return true
      }
    },
    setDataForAuth () {
      this.linkPersonalAccount = `${this.AUTH_USER.user_name} ${this.AUTH_USER.user_surname}`
    },
    openAuthModal () {
      this.$emit('openAuthModal')
    },
    setData () {
      this.pages = this.PAGES
      this.categories = this.CATEGORIES.filter(item => item.show_in_header)
      this.favoriteCountProducts = this.FAVORITE_COUNT_PRODUCTS
    }
  }
}
</script>
