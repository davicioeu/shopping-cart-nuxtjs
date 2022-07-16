import axios from 'axios'

export const state = () => ({
  products: [],
  categorySlug: null,
  viewProductId: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    count: 1
  },
  runGetProducts: 0,
  fullPath: ''
})

export const getters = {
  products: state => state.products,
  pagination: state => state.pagination,
  categorySlug: state => state.categorySlug,
  runGetProducts: state => state.runGetProducts,
  fullPath: state => state.fullPath,
  viewProductId: state => state.viewProductId
}

export const mutations = {
  UPDATE_PRODUCTS (state, data) {
    if (data.addToCurrentProducts) {
      state.products = state.products.concat(data.products.data)
    } else {
      state.products = data.products.data
    }

    state.pagination.currentPage = data.products.current_page
    state.pagination.totalPages = data.products.last_page
    state.pagination.count = data.products.total
  },
  PAGINATION_UPDATE_CURRENT_PAGE (state, page) {
    state.pagination.currentPage = page
  },
  UPDATE_CATEGORY_SLUG (state, categorySlug) {
    state.categorySlug = categorySlug
  },
  UPDATE_RUN_GET_PRODUCTS (state) {
    state.runGetProducts = state.runGetProducts += 1
  },
  UPDATE_FULL_PATH (state, path) {
    state.fullPath = path
  },
  UPDATE_VIEW_PRODUCT_ID (state, id) {
    state.viewProductId = id
  }
}

export const actions = {
  async get ({ commit }, { categorySlug, filters, page = 1, addToCurrentProducts = false, sort = 'name', q = '' }) {
    const { data } = await axios.post(`/products/get?page=${page}`, {
      category_slug: categorySlug,
      filters,
      sort,
      q
    })

    data.addToCurrentProducts = addToCurrentProducts

    commit('UPDATE_PRODUCTS', data, addToCurrentProducts)
    commit('UPDATE_CATEGORY_SLUG', categorySlug)

    return data
  },
  paginationUpdateCurrentPage ({ commit }, { currentPage }) {
    commit('PAGINATION_UPDATE_CURRENT_PAGE', currentPage)
  },
  async view ({ commit }, { slug }) {
    const { data } = await axios.post('/product/view', {
      slug
    })

    return data
  },
  runGetProducts ({ commit }) {
    commit('UPDATE_RUN_GET_PRODUCTS')
  },
  fullPath ({ commit }, path) {
    commit('UPDATE_FULL_PATH', path)
  },
  updateViewProductId ({ commit }, id) {
    commit('UPDATE_VIEW_PRODUCT_ID', id)
  }
}
