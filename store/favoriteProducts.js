import Cookies from 'js-cookie'
import axios from 'axios'

export const state = () => ({
  key: null,
  count: 0,
  idProducts: []
})

export const getters = {
  count: state => state.count,
  key: state => state.key,
  idProducts: state => state.idProducts
}

export const mutations = {
  UPDATE_KEY (state, key) {
    state.key = key
  },
  UPDATE_COUNT (state, count) {
    state.count = count
  },
  INCREASE_VALUE_COUNT (state) {
    state.count += 1
  },
  DECREASE_VALUE_COUNT (state) {
    state.count -= 1
  },
  UPDATE_ID_PRODUCTS (state, idProducts) {
    state.idProducts = idProducts
  },
  REMOVE_ID_PRODUCT (state, productId) {
    state.idProducts = _.filter(state.idProducts, (el) => {
      return el !== productId
    })
  }
}

export const actions = {
  increaseValueCount ({ commit }) {
    commit('INCREASE_VALUE_COUNT')
  },
  decreaseValueCount ({ commit }) {
    commit('DECREASE_VALUE_COUNT')
  },
  updateFavoriteData ({ commit }, { key, count }) {
    Cookies.set('favorite_key', key, { expires: 365 })

    commit('UPDATE_KEY', key)
    commit('UPDATE_COUNT', count)
  },
  updateIdProducts ({ commit }, idProducts) {
    commit('UPDATE_ID_PRODUCTS', idProducts)
  },
  async add ({ commit }, { productId, favoriteKey }) {
    const { data } = await axios.post('/favorite/add', {
      product_id: productId,
      favorite_key: favoriteKey
    })

    return data
  },
  async remove ({ commit }, { productId, favoriteKey }) {
    const { data } = await axios.post('/favorite/remove', {
      product_id: productId,
      favorite_key: favoriteKey
    })

    commit('REMOVE_ID_PRODUCT', productId)

    return data
  }
}
