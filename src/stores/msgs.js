export default {
  state: {
    msgs: []
  },
  mutations: {
    // Add a message
    add (state, msg) {
      state.msgs.push(msg)
    },
    // Remove a message
    remove (state, msg) {
      let index = state.msgs.indexOf(msg)
      if (index !== -1) {
        state.msgs.splice(index, 1)
      }
    }
  },
  actions: {
    // Add a message by type
    addMsgType ({ commit }, { text, type }) {
      let msg = { text, type }
      commit('add', msg)
      setTimeout(() => commit('remove', msg), 5000)
    },
    // Add success message
    addSuccess ({ dispatch }, text) {
      dispatch('add', { text, type: 'success' })
    },
    // Add error message
    addError ({ dispatch }, text) {
      dispatch('add', { text, type: 'error' })
    }
  }
}
