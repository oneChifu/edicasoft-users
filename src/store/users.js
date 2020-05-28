export default {
  namespaced: true,

  state: {
    data: []
  },

  getters: {
    data(state) {
      return state.data;
    },
  },

  mutations: {
    SET_USERS(state, data) {
      state.data = data
    },

    SET_USER(state, data) {
      state.data.push(data)
    }
  },

  actions: {
    async getUsers({ dispatch }) {
      try {
        await this._vm.$axios
          .get(`users`)
          .then(async response => {
            await dispatch('setUsers', response.data)
          })
      } catch (e) {
        dispatch("setError", e, { root: true });
        throw e;
      }
    },

    async setUsers({ commit }, data) {
      commit('SET_USERS', data)
    },

    async addUser({ dispatch, commit, rootState}, data) {
      data.timestamp = Math.floor(Date.now() / 1000)

      try {
        await this._vm.$axios
          .post(`users`, data)
          .then(async response => {
            console.log('addUser', response)

            commit('SET_USER', response)
          })
      } catch (e) {
        dispatch("setError", e, { root: true });
        throw e;
      }
    },
  }
};
