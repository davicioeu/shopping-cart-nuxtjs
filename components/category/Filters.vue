<template>
  <div class="filter">
    <h3>{{ $t('text.filter') }}</h3>
    <RenderFilters
      :prefix-id-filter="prefixIdFilter"
      @getProducts="emitGetProducts"
      @setCategory="emitSetCategory"
    />
  </div>
</template>

<script>
import RenderFilters from './RenderFilters'

export default {
  name: 'Filters',
  components: {
    RenderFilters
  },
  data: () => ({
    prefixIdFilter: 'desc'
  }),
  methods: {
    emitGetProducts () {
      this.$emit('getProducts')
    },
    emitSetCategory (category) {
      this.$emit('setCategory', category)
    }
  }
}
</script>
