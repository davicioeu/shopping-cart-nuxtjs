import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    LOCALE: 'lang/locale',
    LOCALES: 'lang/locales'
  }),
  methods: {
    getMetaTags (model) {
      const seo = {
        title: '',
        meta: []
      }

      if (typeof model.title !== 'undefined') {
        seo.title = model.title
      } else if (typeof model.name !== 'undefined') {
        seo.title = model.name
      }

      seo.meta.push({
        hid: 'og:title',
        name: 'og:title',
        content: seo.title
      })

      if (typeof model.m_keywords !== 'undefined') {
        seo.meta.push({
          hid: 'keywords',
          name: 'keywords',
          content: (model.m_keywords !== null) ? model.m_keywords : ''
        })
      }

      if (typeof model.m_description !== 'undefined') {
        seo.meta.push({
          hid: 'description',
          name: 'description',
          content: (model.m_description !== null) ? model.m_description : ''
        })
      }

      seo.meta.push({
        hid: 'og:locale',
        name: 'og:locale',
        content: this.LOCALE
      })

      Object.keys(this.LOCALES).filter((item) => {
        return item !== this.LOCALE
      }).forEach((locale) => {
        seo.meta.push({
          hid: 'og:locale:alternate',
          name: 'og:locale:alternate',
          content: locale
        })
      })

      return seo
    }
  }
}
