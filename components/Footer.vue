<template>
  <footer class="footer">
    <div class="container">
      <div class="row between">
        <div class="column f_logo">
          <img :src="logo" alt="" class="footer_logo">

          <SubscribeForm />
        </div>
        <div class="column f_works">
          <h3>
            {{ $t('text.schedule') }}
          </h3>
          <ul class="works">
            <li v-html="schedule"></li>
            <li v-if="socialNetworks.length">
              <ul class="socials">
                <li
                  v-for="socialNetwork in socialNetworks"
                  :key="`footer-sn-${socialNetwork.id}`"
                >
                  <a :href="socialNetwork.url" target="_blank">
                    {{ socialNetwork.name }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="column f_menu">
          <ul class="footer_menu">
            <li>
              <nuxt-link :to="{ name: 'catalog' }">
                {{ $t('link.catalog') }}
              </nuxt-link>
            </li>
            <li style="display: none">
              <a href="#">Личный кабинет</a>
            </li>

            <li
              v-for="page in pages"
              :key="page.id"
            >
              <nuxt-link :to="{ name: 'textPage', params: { slug: page.slug }}">
                {{ page.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="column f_contacts">
          <h3>
            {{ $t('text.contact_us') }}
          </h3>
          <ul class="footer_contacts">
            <li v-if="tel1 !== null">
              {{ tel1 }}
            </li>
            <li v-if="tel2 !== null">
              {{ tel2 }}
            </li>
            <li v-if="email !== null">
              {{ email }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import imageMixin from '../mixins/imageMixin'
import setting from '../mixins/setting'
import SubscribeForm from './footer/SubscribeForm'

export default {
  name: 'Footer',
  components: {
    SubscribeForm
  },
  mixins: [imageMixin, setting],
  data () {
    return {
      tel1: null,
      tel2: null,
      email: null,
      schedule: null,
      logo: null,
      searchPlaceholder: this.$t('text.search'),
      socialNetworks: [],
      pages: []
    }
  },
  computed: mapGetters({
    SETTINGS: 'commonData/settings',
    LOAD_DATA: 'commonData/loadData',
    SOCIAL_NETWORKS: 'commonData/socialNetworks',
    PAGES: 'commonData/pages'
  }),
  watch: {
    'LOAD_DATA' () {
      this.setData()
    }
  },
  methods: {
    setData () {
      this.socialNetworks = this.SOCIAL_NETWORKS
      this.pages = this.PAGES

      this.tel1 = this.getSettingItem('tel1').parent_value
      this.tel2 = this.getSettingItem('tel2').parent_value
      this.email = this.getSettingItem('email').parent_value
      this.schedule = this.getSettingItem('schedule').value

      this.logo = this.getUrlImg(`logo/${this.getSettingItem('logo').parent_value}`)
    }
  }
}
</script>
