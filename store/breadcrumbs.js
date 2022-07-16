export const state = () => ({
  breadcrumbs: []
})

export const getters = {
  breadcrumbs: state => state.breadcrumbs
}

export const mutations = {
  SET_BREADCRUMBS (state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs
  }
}

export const actions = {
  setBreadcrumbs ({ commit }, breadcrumbs) {
    commit('SET_BREADCRUMBS', breadcrumbs)
  }
}
