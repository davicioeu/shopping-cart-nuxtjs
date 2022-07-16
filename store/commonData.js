import axios from 'axios'
import Cookies from 'js-cookie'

export const state = () => ({
  settings: [],
  textPages: [],
  pages: [],
  socialNetworks: [],
  sliderItems: [],
  partners: [],
  categories: [],
  lastCategoryView: null,
  filters: [],
  hitProducts: [],
  recommendedProducts: [],
  discountProducts: [],
  newProducts: [],
  promotionalCodes: [],
  loadData: false
})

export const getters = {
  settings: state => state.settings,
  textPages: state => state.textPages,
  pages: state => state.pages,
  socialNetworks: state => state.socialNetworks,
  sliderItems: state => state.sliderItems,
  partners: state => state.partners,
  categories: state => state.categories,
  filters: state => state.filters,
  loadData: state => state.loadData,
  hitProducts: state => state.hitProducts,
  recommendedProducts: state => state.recommendedProducts,
  discountProducts: state => state.discountProducts,
  newProducts: state => state.newProducts,
  promotionalCodes: state => state.promotionalCodes,
  lastCategoryView: state => state.lastCategoryView
}

export const mutations = {
  UPDATE_COMMON_DATA (state, data) {
    state.settings = data.settings
    state.textPages = data.text_pages
    state.pages = data.pages
    state.socialNetworks = data.social_networks
    state.sliderItems = data.slider_items
    state.partners = data.partners
    state.categories = data.categories
    state.filters = data.filters
    state.hitProducts = data.hit_products
    state.discountProducts = data.discount_products
    state.newProducts = data.new_products
    state.recommendedProducts = data.recommended_products
    state.promotionalCodes = data.promotional_codes

    state.loadData = true
  },
  SHOW_ALL_CHILDREN_FILTER (state, id) {
    const filter = state.filters.find(el => el.id === id)
    filter.children.map((el) => {
      el.show = true

      return el
    })
  },
  HIDE_CHILDREN_FILTER (state, id) {
    const filter = state.filters.find(el => el.id === id)
    filter.children.map((el, index) => {
      el.show = (index < 5)
      return el
    })
  },
  SET_LAST_CATEGORY_VIEW (state, category) {
    state.lastCategoryView = category
  }
}

export const actions = {
  async startApp ({ commit }) {
    const { data } = await axios.post('/app/start', {
      'favorite_key': Cookies.get('favorite_key'),
      'cart_key': Cookies.get('cart_key')
    })

    commit('UPDATE_COMMON_DATA', data)

    return data
  },
  showAllChildrenFilter ({ commit }, id) {
    commit('SHOW_ALL_CHILDREN_FILTER', id)
  },
  hideChildrenFilter ({ commit }, id) {
    commit('HIDE_CHILDREN_FILTER', id)
  },
  setLastCategoryView ({ commit }, category) {
    commit('SET_LAST_CATEGORY_VIEW', category)
  }
}
