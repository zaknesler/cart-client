export const state = () => ({
  message: null,
  viewCount: 0
})

export const getters = {
  message (state) {
    return state.message
  },

  viewCount (state) {
    return state.viewCount
  }
}

export const mutations = {
  SET_MESSAGE (state, message) {
    state.message = message
  },

  ADD_VIEW_COUNT (state) {
    state.viewCount++
  },

  RESET_VIEW_COUNT (state) {
    state.viewCount = 0
  }
}

export const actions = {
  flash ({ commit }, message) {
    commit('SET_MESSAGE', message)
  },

  addViewCount ({ commit }) {
    commit('ADD_VIEW_COUNT')
  },

  clear ({ commit }) {
    commit('SET_MESSAGE', null)
    commit('RESET_VIEW_COUNT')
  }
}
