export default {
  namespaced: true,
  state: {
    search: ''
  },
  getters: {
    search: (s) => s.search
  },
  mutations: {
    setSearch(state, data) {
      state.search = data
    }
  },
  actions: {
    setSearch({ commit }, data) {
      commit('setSearch', data)
    }
  }
}
