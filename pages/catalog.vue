<template>
  <fragment>
    <section class="catalogue">
      <div class="container">
        <div class="row categories">
          <div
            v-for="category in categories"
            :key="`category-in-page-${category.id}`"
            class="cat_name"
          >
            <nuxt-link :to="{ name: 'category', params: { slug: category.slug }, query: {sort: 'name', page: 1} }">
              <img
                v-if="category.image_preview !== null"
                :src="getUrlImg(`category/${category.image_preview}`)"
                alt=""
              >
            </nuxt-link>
            <nuxt-link :to="{ name: 'category', params: { slug: category.slug }, query: {sort: 'name', page: 1} }">
              {{ category.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </fragment>
</template>

<script>
import { mapGetters } from 'vuex'
import imageMixin from '../mixins/imageMixin'

export default {
  name: 'Catalog',
  mixins: [imageMixin],
  head () {
    return {
      title: this.$t('link.catalog')
    }
  },
  data: () => ({
    categories: []
  }),
  computed: mapGetters({
    CATEGORIES: 'commonData/categories',
    LOAD_DATA: 'commonData/loadData'
  }),
  watch: {
    'LOAD_DATA' () {
      this.setData()
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      this.$store.dispatch('breadcrumbs/setBreadcrumbs', [
        { linkName: this.$t('link.catalog') }
      ])

      this.categories = this.CATEGORIES
    }
  }
}
</script>
