import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    FILTERS: 'commonData/filters'
  }),
  methods: {
    getPatentFilter (id) {
      return this.FILTERS.find(el => el.id === id) || {
        name: '',
        children: []
      }
    },
    getChildrenFilter (id) {
      let parentFilter = {}
      if (this.FILTERS.length) {
        parentFilter = _.find(this.FILTERS, (filter) => {
          return _.some(filter.children, { id })
        })
      }

      if (typeof parentFilter.children !== 'undefined' && parentFilter.children.length) {
        return parentFilter.children.find(el => el.id === id) || {
          name: ''
        }
      } else {
        return {
          name: ''
        }
      }
    }
  }
}
