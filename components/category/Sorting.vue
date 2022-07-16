<template>
  <div class="row select">
    <h3>
      {{ $t('text.sort') }}
    </h3>
    <div class="selectdiv">
      <select class="choose" />
      <div class="custom-select">
        <span class="spanVal" @click="showListSortItems ? showListSortItems = false : showListSortItems = true">
          {{ activeSortItem.name }}
        </span>
        <ul
          v-click-outside="vcoConfig"
          :style="showListSortItems ? 'display: block;' : 'display: none;'"
        >
          <li
            v-for="(sort, index) in sortItems"
            :key="`sort-item-${index}`"
            @click="selectSortItem(sort)"
          >
            {{ sort.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sorting',
  data () {
    return {
      vcoConfig: {
        handler: () => { this.showListSortItems = false },
        middleware: this.middlewareVco,
        events: ['dblclick', 'click'],
        isActive: true
      },
      showListSortItems: false,
      activeSortItem: {
        name: this.$t('sort.name'),
        value: 'name'
      },
      sortItems: [
        { name: this.$t('sort.name'), value: 'name' },
        { name: this.$t('sort.rating'), value: 'rating' },
        { name: this.$t('sort.price_asc'), value: 'price_asc' },
        { name: this.$t('sort.price_desc'), value: 'price_desc' },
        { name: this.$t('sort.recommended'), value: 'recommended' },
        { name: this.$t('sort.new_products'), value: 'new_products' },
        { name: this.$t('sort.discount_products'), value: 'discount_products' },
        { name: this.$t('sort.is_hit'), value: 'is_hit' }
      ]
    }
  },
  mounted () {
    if (typeof this.$router.currentRoute.query.sort !== 'undefined') {
      if (this.sortItems.findIndex(item => item.value === this.$router.currentRoute.query.sort) !== -1) {
        this.activeSortItem = this.sortItems.find(item => item.value === this.$router.currentRoute.query.sort)
      } else {
        const query = Object.assign({}, this.$route.query)
        delete query.sort
        this.$router.push({ query })
      }
    } else {
      this.setRouterData()
    }
  },
  methods: {
    setRouterData () {
      this.$router.push({ query: Object.assign({}, this.$route.query, { sort: this.activeSortItem.value }) })
    },
    selectSortItem (sort) {
      this.showListSortItems = false
      this.activeSortItem = sort

      this.setRouterData()

      this.$emit('getProducts')
    },
    middlewareVco (event, el) {
      if (this.showListSortItems && event.target.className !== 'spanVal') {
        return true
      }
    }
  }
}
</script>
