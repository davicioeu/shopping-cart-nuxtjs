<template>
  <div class="filter_mobile">
    <div class="variants">
      <button
        :class="(showFilters) ? 'collapsible active' : 'collapsible'"
        @click="handlerShowFilters"
      >
        {{ $t('text.filter') }}
      </button>
      <div
        :style="showFilters ? 'display: block' : 'display:none'"
        class="content"
      >
        <RenderFilters
          :prefix-id-filter="prefixIdFilter"
          @getProducts="emitGetProducts"
          @setCategory="emitSetCategory"
        />
      </div>
      <div class="selectdiv">
        <select class="choosemobile">
          <option selected>
            За рейтингом
          </option>
          <option>По возрастанию</option>
          <option>По убыванию</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import RenderFilters from './RenderFilters'

export default {
  name: 'FiltersMobile',
  components: {
    RenderFilters
  },
  data: () => ({
    showFilters: false,
    prefixIdFilter: 'mobile'
  }),
  methods: {
    handlerShowFilters () {
      this.showFilters = (!this.showFilters)
    },
    emitGetProducts () {
      this.$emit('getProducts')
    },
    emitSetCategory (category) {
      this.$emit('setCategory', category)
    }
  }
}
</script>
