<template>
  <fragment>
    <section class="about_us about_desktop">
      <div class="container">
        <div class="row bg-img">
          <img
            v-if="image !== null"
            :src="image"
            alt=""
            class="about_desktop_img"
          >
          <div class="about_text" v-html="page.description" />
        </div>
      </div>
    </section>

    <section class="about_mobile">
      <div class="container aboutUs_fullscreen">
        <div class="row fs_row">
          <img
            v-if="image !== null"
            :src="image"
            alt=""
            class="about_us_img"
          >
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="about_mobile_desc" v-html="page.description" />
        </div>
      </div>
    </section>

    <Partners
      v-if="this.$route.name === 'aboutUs'"
      :partners="partners"
    />
  </fragment>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import imageMixin from '../mixins/imageMixin'
import Partners from '../components/aboutUs/Partners'
import metaMixin from '../mixins/metaMixin'

export default {
  name: 'Page',
  components: {
    Partners
  },
  mixins: [imageMixin, metaMixin],
  head () {
    return this.getMetaTags(this.page)
  },
  data: () => ({
    page: {
      description: null,
      image_origin: null
    },
    image: null,
    partners: []
  }),
  computed: mapGetters({
    LOAD_DATA: 'commonData/loadData',
    TEXT_PAGE: 'commonData/textPages',
    PARTNERS: 'commonData/partners'
  }),
  watch: {
    'LOAD_DATA' () {
      this.setData()
    }
  },
  async asyncData ({ route, params, error }) {
    const data = {
      page: {
        description: null,
        image_origin: null
      },
      image: null,
      partners: []
    }

    if (process.server) {
      const routeName = route.name
      // eslint-disable-next-line no-unused-vars
      let slugValue = null
      switch (routeName) {
        case 'aboutUs':
          slugValue = 'about_us'
          break
        case 'userAgreement':
          slugValue = 'user_agreement'
          break
      }

      const apiData = await axios.post('/text_page', {
        'slug': slugValue
      })

      if (typeof apiData.data !== 'undefined') {
        data.page = apiData.data.page
        if (data.page.image_origin !== null) {
          data.image = `${process.env.imgUrl}/page/${data.page.image_origin}`
        }
      }

      return data
    }

    return data
  },
  mounted () {
    if (this.LOAD_DATA) {
      this.setData()
    }
  },
  methods: {
    setData () {
      const routeName = this.$route.name
      let slugValue = null
      switch (routeName) {
        case 'aboutUs':
          slugValue = 'about_us'
          break
        case 'userAgreement':
          slugValue = 'user_agreement'
          break
      }
      const index = this.TEXT_PAGE.findIndex(el => el.slug === slugValue)
      if (index !== -1) {
        this.page = this.TEXT_PAGE.find(el => el.slug === slugValue)
        this.$store.dispatch('breadcrumbs/setBreadcrumbs', [
          { linkName: this.page.title }
        ])
        if (this.page.image_origin !== null) {
          this.image = this.getUrlImg(`page/${this.page.image_origin}`)
        }
      }
      this.partners = this.PARTNERS
    }
  }
}
</script>
