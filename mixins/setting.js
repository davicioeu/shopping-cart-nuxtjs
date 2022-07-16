export default {
  methods: {
    getSettingItem (slug) {
      const index = this.SETTINGS.findIndex(el => el.slug === slug)
      if (index !== -1) {
        return this.SETTINGS.find(el => el.slug === slug)
      }
      return {
        slug: null,
        parent_value: null
      }
    }
  }
}
