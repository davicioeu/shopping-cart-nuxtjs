<template>
  <section class="about_us">
    <div class="container">
      <div class="row title_block">
        <h2>{{ $t('text.about_store') }}</h2>
        <div class="more">
          <nuxt-link :to="{ name: 'aboutUs' }">
            {{ $t('link.learn_more') }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div
      class="container aboutUs_fullscreen"
      :style="'--img: url(\'/images/aboutus-bg.png\')'"
    >
      <div class="row fs_row">
        <img :src="image" alt="" class="about_us_img">
        <div class="about_us_desc">
          <p v-html="page.description" />
          <nuxt-link class="more_mobile" :to="{ name: 'aboutUs' }">
            {{ $t('link.learn_more') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import imageMixin from '../../mixins/imageMixin'

export default {
  name: 'AboutUs',
  mixins: [imageMixin],
  data: () => ({
    image: null,
    page: {
      description: null,
      image_origin: null
    }
  }),
  computed: mapGetters({
    TEXT_PAGES: 'commonData/textPages',
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
    }
  },
  methods: {
    setData () {
      const index = this.TEXT_PAGES.findIndex(el => el.slug === 'about_us_index')
      if (index !== -1) {
        this.page = this.TEXT_PAGES.find(el => el.slug === 'about_us_index')
        this.image = this.getUrlImg(`page/${this.page.image_origin}`)
      }
    }
  }
}
</script>
