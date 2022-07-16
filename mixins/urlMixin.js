import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    LOCALE: 'lang/locale',
    LOCALES: 'lang/locales'
  }),
  methods: {
    openUrlSlide (slide) {
      const url = slide.url
      if (url !== null && url.length) {
        this.$router.push({
          path: this.prepareLinkBasedOnLocal(url)
        })
      }
    },
    prepareLinkBasedOnLocal (url) {
      for (const [key] of Object.entries(this.LOCALES)) {
        url = url.replace(key, this.LOCALE)
      }
      return url
    }
  }
}
