<template>
  <header id="header" class="top">
    <div class="container">
      <div class="row top_line">
        <ul class="top_menu">
          <li>
            <nuxt-link :to="{ name: 'aboutUs'}">
              {{ $t('link.about_us') }}
            </nuxt-link>
          </li>
          <li
            v-for="page in pages"
            :key="page.id"
          >
            <nuxt-link :to="{ name: 'textPage', params: { slug: page.slug }}">
              {{ page.name }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'contacts' }">
              {{ $t('link.contacts') }}
            </nuxt-link>
          </li>
        </ul>
        <ul class="top_contacts">
          <li v-html="schedule_header"></li>

          <li v-if="tel1" v-text="tel1"></li>

          <li v-if="tel2" v-text="tel2"></li>

          <li class="language">
            <template v-for="(value, index) in LOCALES">
              <a :key="`link-${index}`"
                 href="javascript:void(0)"
                 style="text-transform: uppercase"
                 :class="(LOCALE === index) ? `${index} active` : value"
                 @click.prevent="setLocale(index)"
              >
                {{ value }}
              </a>
              <span v-if="!checkLastElement(index)"
                    :key="`span-${index}`"
              >
                |
              </span>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import setting from '../mixins/setting'
import { loadMessages } from './../plugins/i18n'

export default {
  name: 'Header',
  mixins: [setting],
  data: () => ({
    tel1: null,
    tel2: null,
    pages: [],
    schedule_header: null
  }),
  computed: mapGetters({
    LOCALE: 'lang/locale',
    LOCALES: 'lang/locales',
    SETTINGS: 'commonData/settings',
    PAGES: 'commonData/pages',
    LOAD_DATA: 'commonData/loadData'
  }),
  watch: {
    'LOAD_DATA' () {
      this.setData()
    }
  },
  methods: {
    setData () {
      this.tel1 = this.getSettingItem('tel1').parent_value
      this.tel2 = this.getSettingItem('tel2').parent_value
      this.schedule_header = this.getSettingItem('schedule_header').value
      this.pages = this.PAGES
    },
    checkLastElement (index) {
      return (Object.keys(this.LOCALES)[Object.keys(this.LOCALES).length - 1] === index)
    },
    setLocale (locale) {
      if (this.$i18n.locale !== locale) {
        loadMessages(locale)

        this.$router.push({ params: { lang: locale } })

        this.$store.dispatch('lang/setLocale', { locale }).then(() => {
          setTimeout(() => {
            window.location.reload(true)
          }, 800)
        })
      }
    }
  }
}
</script>
