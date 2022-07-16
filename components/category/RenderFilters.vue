<template>
  <div>
    <template
      v-for="filter in filters"
    >
      <button
        :key="`btn-${filter.id}`"
        :class="(checkStatusCollapse(filter.id).show) ? 'collapsible' : 'collapsible active'"
        @click="handlerClickCollapse(filter.id)"
      >
        {{ filter.name }}
      </button>
      <div
        :key="`checkboxes-${filter.id}`"
        :style="checkStatusCollapse(filter.id).show ? 'display:block' : 'display:none'"
        class="content"
      >
        <ul>
          <template v-for="filter_item in filter.children">
            <li
              v-if="filter_item.show"
              :key="`filter-item-${filter_item.id}`"
              class="checkbox"
            >
              <input
                :id="`${prefixIdFilter}-${filter_item.id}`"
                v-model="selectFilters"
                :value="filter_item.id"
                type="checkbox"
                name="filters"
              >
              <label :for="`${prefixIdFilter}-${filter_item.id}`">
                {{ filter_item.name }}
              </label>
            </li>
          </template>
          <li v-if="checkShowBtn(filter.children, filter.id)">
            <a
              href="javascript:void(0)"
              @click="handlerHidingFilters(filter.id, checkHideChildrenFilter(filter.id))"
            >
              <template v-if="(checkHideChildrenFilter(filter.id))">
                {{ $t('link.show_all') }}
              </template>
              <template v-else>
                {{ $t('link.collapse_list') }}
              </template>
            </a>
          </li>
        </ul>
      </div>
    </template>
    <client-only>
      <div class="content rs_content">
        <div class="range-slider" style="display: none">
          <div id="price-slider">
            <p>
              <label for="amount" />
              <input
                :id="`${prefixIdFilter}-amount-min`"
                class="minrange"
                type="text"
                readonly
              >
              <span> - </span>
              <input
                :id="`${prefixIdFilter}-amount-max`"
                class="maxrange"
                type="text"
                readonly
              >
              <span> {{ $t('text.uah') }}</span>
            </p>
            <div id="slider-range" />
          </div>
        </div>
      </div>
      <div
        v-if="filters.length"
        class="rs_btns"
      >
        <button
          class="show_price"
          @click="callGetProducts"
        >
          {{ $t('link.show') }}
        </button>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CategoryPriceSlider from '../../mixins/CategoryPriceSlider'
import metaMixin from '../../mixins/metaMixin'

export default {
  name: 'RenderFilters',
  mixins: [CategoryPriceSlider, metaMixin],
  props: ['prefixIdFilter'],
  data: () => ({
    category: {
      filters: []
    },
    filters: [],
    categorySlug: null,
    selectFilters: [],
    collapseStatus: []
  }),
  computed: mapGetters({
    LOAD_DATA: 'commonData/loadData',
    CATEGORIES: 'commonData/categories',
    FILTERS: 'commonData/filters'
  }),
  watch: {
    'LOAD_DATA' () {
      this.setData()
    },
    'selectFilters' (filters) {
      this.$router.push({ query: Object.assign({}, this.$route.query, { filters }) })
    }
  },
  mounted () {
    if (this.LOAD_DATA) {
      this.setData()
    }

    this.initPriceSlider(
      '#amount-min',
      '#amount-max',
      '#slider-range',
      [5000, 15000],
      0, 20000
    )
  },
  methods: {
    handlerClickCollapse (filterId) {
      const index = this.collapseStatus.findIndex(el => el.filterId === filterId)
      const filter = this.collapseStatus[index]
      filter.show = (!filter.show)
      this.collapseStatus[index] = filter
    },
    checkStatusCollapse (filterId) {
      if (this.collapseStatus.length) {
        return this.collapseStatus.find(el => el.filterId === filterId)
      }
      return {
        show: false
      }
    },
    checkShowBtn (childrenFilters, filterId) {
      const filters = childrenFilters.map((el) => {
        return el.id
      })
      const xorIds = _.xor(filters, this.selectFilters)
      if (xorIds.length < filters.length) {
        this.$store.dispatch('commonData/showAllChildrenFilter', filterId)
        return false
      } else if (!(xorIds.length < filters.length) && filters.length >= 5) {
        return true
      } else {
        return false
      }
    },
    checkHideChildrenFilter (id) {
      let result = false
      const filter = this.filters.find(el => el.id === id)
      filter.children.forEach((el) => {
        if (!el.show) {
          result = true
        }
      })
      return result
    },
    handlerHidingFilters (id, status) {
      const filter = this.filters.find(el => el.id === id)

      if (!status) {
        if (this.$route.name === 'products') {
          filter.children.map((el, index) => {
            el.show = (index < 5)
            return el
          })
        }
        this.$store.dispatch('commonData/hideChildrenFilter', id)
      } else {
        if (this.$route.name === 'products') {
          const filter = this.filters.find(el => el.id === id)
          filter.children.map((el) => {
            el.show = true
            return el
          })
        }
        this.$store.dispatch('commonData/showAllChildrenFilter', id)
      }
    },
    callGetProducts () {
      this.$router.push({ query: Object.assign({}, this.$route.query, { page: 1 }) })
      this.$emit('getProducts')
    },
    setData () {
      if (this.$route.query.filters !== undefined) {
        if (Array.isArray(this.$route.query.filters)) {
          this.selectFilters = this.$route.query.filters.map(Number)
        } else {
          this.selectFilters = [this.$route.query.filters]
        }
      }

      if (this.CATEGORIES.length) {
        const category = this.CATEGORIES.find(el => el.slug === this.$route.params.slug)
        if (category !== undefined) {
          this.category = category
          this.$emit('setCategory', this.category)

          this.categorySlug = category.slug
          this.filters = this.category.filters.map((categoryFilter) => {
            this.collapseStatus.push({
              filterId: categoryFilter.filter_id,
              show: true
            })
            return this.FILTERS.find(el => el.id === categoryFilter.filter_id)
          })
          if (this.selectFilters.length) {
            this.filters.forEach((filter) => {
              const idFilters = filter.children.map((el) => {
                return el.id
              })
              const found = idFilters.some(r => this.selectFilters.includes(r))
              if (found) {
                this.$store.dispatch('commonData/showAllChildrenFilter', filter.id)
              }
            })
          }

          this.filters = _.orderBy(this.filters, [filter => [filter.sorting_order, filter.name.toLowerCase()]], ['asc'])
          this.filters = this.filters.filter(item => item.show_in_catalog === 1)
        } else {
          this.category = {
            name: this.$t('text.all_products'),
            route_name: 'products'
          }
          this.$emit('setCategory', this.category)

          this.filters = _.cloneDeep(this.FILTERS)
          this.filters.forEach((filter) => {
            this.collapseStatus.push({
              filterId: filter.id,
              show: true
            })
          })

          if (this.selectFilters.length) {
            this.filters.forEach((filter) => {
              const idFilters = filter.children.map((el) => {
                return el.id
              })
              const found = idFilters.some(r => this.selectFilters.includes(r))
              if (found) {
                this.$store.dispatch('commonData/showAllChildrenFilter', filter.id)
              }
            })
          }

          this.filters = _.orderBy(this.filters, [filter => [filter.sorting_order, filter.name.toLowerCase()]], ['asc'])
          this.filters = this.filters.filter(item => item.show_in_catalog === 1)
        }
      }
    }
  }
}
</script>
