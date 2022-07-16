<template>
  <section class="delivery_info">
    <div class="container">
      <div class="row">
        <div v-for="(item, index) in page.items"
             :key="item.id"
             :class="((index+1 % 2) === 2) ? 'delivery' : 'warranty'"
             :style="`background-image: url(${getUrlImg('page_item/' + item.image_origin)});`"
        >
          <div class="info">
            <h2>{{ item.title }}</h2>
            <div v-html="item.description" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import imageMixin from '../mixins/imageMixin'
import metaMixin from '../mixins/metaMixin'

export default {
  name: 'TextPage',
  mixins: [imageMixin, metaMixin],
  head () {
    return this.getMetaTags(this.page)
  },
  data: () => ({
    page: {
      items: []
    }
  }),
  computed: mapGetters({
    LOAD_DATA: 'commonData/loadData',
    PAGES: 'commonData/pages'
  }),
  watch: {
    'LOAD_DATA' () {
      this.setData()
    }
  },
  async asyncData ({ route, params, error }) {
    const data = {
      page: {
        items: []
      }
    }

    if (process.server && typeof params.slug !== 'undefined') {
      const apiData = await axios.post('/page', {
        'slug': params.slug
      })

      if (typeof apiData.data !== 'undefined') {
        data.page = apiData.data.page
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
      const index = this.PAGES.findIndex(el => el.slug === this.$route.params.slug)
      if (index !== -1) {
        this.page = this.PAGES.find(el => el.slug === this.$route.params.slug)
        this.$store.dispatch('breadcrumbs/setBreadcrumbs', [
          { linkName: this.page.name }
        ])
      }
    }
  }
}
</script>
