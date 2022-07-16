<template>
  <div class="description">
    <template
      v-if="productDescription !== null && productDescription.length"
    >
      <h3 class="desc_title">
        {{ $t('text.description') }}
      </h3>
      <div
        class="desc_text"
        v-html="productDescription"
      />
    </template>

    <h3
      v-if="productFilters.length"
      id="desc_title"
      class="desc_title"
    >
      {{ $t('text.characteristics') }}
    </h3>

    <table v-if="productFilters.length">
      <tr
        v-for="filter in productFilters"
        :key="`filter-table-${filter.id}`"
      >
        <td class="characteristic">
          {{ getPatentFilter(filter.filter_id).name }}
        </td>
        <td class="value">
          {{ getChildrenFilter(filter.filter_item_id).name }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import filterMixin from '../../mixins/filterMixin'

export default {
  name: 'DescriptionAndParameters',
  mixins: [filterMixin],
  props: ['productDescription', 'productFilters']
}
</script>
