import Cookies from 'js-cookie'
import axios from 'axios'

export const state = () => ({
  key: null,
  count: 0,
  idProducts: [],
  runGetCartData: 0
})

export const getters = {
  count: state => state.count,
  key: state => state.key,
  idProducts: state => state.idProducts,
  runGetCartData: state => state.runGetCartData
}

export const mutations = {
  UPDATE_KEY (state, key) {
    state.key = key
  },
  UPDATE_COUNT (state, count) {
    state.count = count
  },
  INCREASE_VALUE_COUNT (state) {
    state.count = state.count + 1
  },
  DECREASE_VALUE_COUNT (state) {
    state.count = state.count - 1
  },
  SUM_VALUE_COUNT (state, value) {
    state.count = state.count + value
  },
  UPDATE_ID_PRODUCTS (state, idProducts) {
    state.idProducts = idProducts
  },
  REMOVE_ID_PRODUCT (state, productId) {
    state.idProducts = _.filter(state.idProducts, (el) => {
      return el !== productId
    })
  },
  UPDATE_RUN_GET_CART_DATA (state) {
    state.runGetCartData += 1
  }
}

export const actions = {
  updateRunGetCartData ({ commit }) {
    commit('UPDATE_RUN_GET_CART_DATA')
  },
  increaseValueCount ({ commit }) {
    commit('INCREASE_VALUE_COUNT')
  },
  decreaseValueCount ({ commit }) {
    commit('DECREASE_VALUE_COUNT')
  },
  updateCartData ({ commit }, { key, count }) {
    Cookies.set('cart_key', key, { expires: 365 })

    commit('UPDATE_KEY', key)
    commit('UPDATE_COUNT', count)
  },
  updateCountProducts ({ commit }, count) {
    commit('UPDATE_COUNT', count)
  },
  updateIdProducts ({ commit }, idProducts) {
    commit('UPDATE_ID_PRODUCTS', idProducts)
  },
  async add ({ commit }, { productId, cartKey, quantity }) {
    const { data } = await axios.post('/cart/add', {
      product_id: productId,
      cart_key: cartKey,
      quantity
    })

    return data
  },
  async changeQuantity ({ commit }, { productId, cartKey, quantity }) {
    const { data } = await axios.post('/cart/change_quantity', {
      product_id: productId,
      cart_key: cartKey,
      quantity
    })

    commit('UPDATE_COUNT', data.count_products)

    return data
  },
  async remove ({ commit }, { productId, cartKey }) {
    const { data } = await axios.post('/cart/remove', {
      product_id: productId,
      cart_key: cartKey
    })

    commit('REMOVE_ID_PRODUCT', productId)
    commit('UPDATE_COUNT', data.count_products)

    return data
  },
  sumValueCount ({ commit }, value) {
    commit('SUM_VALUE_COUNT', value)
  }
}
