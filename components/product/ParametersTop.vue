<template>
  <div v-if="filters.length" class="advantages">
    <div
      v-for="filter in filters"
      :key="`filter-top-${filter.id}`"
      class="advant_name"
    >
      <div class="name">
        {{ getPatentFilter(filter.filter_id).name }}
      </div>
      <div class="value">
        {{ getChildrenFilter(filter.filter_item_id).name }}
      </div>
    </div>
    <button class="see_advantages"
            @click="scrollToDesc"
    >
      {{ $t('link.show_all_characteristics') }}
    </button>
  </div>
</template>

<script>
import filterMixin from '../../mixins/filterMixin'

export default {
  name: 'ParametersTop',
  mixins: [filterMixin],
  props: ['topFilters'],
  data: () => ({
    filters: []
  }),
  watch: {
    'topFilters' (filters) {
      this.filters = filters
    }
  },
  mounted () {
    this.filters = this.topFilters
  },
  methods: {
    scrollToDesc () {
      this.$scrollTo('#desc_title')
    }
  }
}
</script>
