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
    async getUsers({ commit }) {
      try {
        await this._vm.$axios
          .get(`users`)
          .then(async response => {
            commit('SET_USERS', response.data)
          })
      } catch (e) {
        dispatch("setError", e, { root: true });
        throw e;
      }
    },

    async addUser({ dispatch, commit }, data) {
      data.timestamp = Math.floor(Date.now() / 1000)

      try {
        await this._vm.$axios
          .post(`users`, data)
          .then(async response => {
            commit('SET_USER', response.data)
          })
      } catch (e) {
        dispatch("setError", e, { root: true });
        throw e;
      }
    },

    async editUser({ dispatch, commit, state }, data) {
      try {
        await this._vm.$axios
          .put(`users/${data.id}`, data)
          .then(async response => {
            let result = state.data.map(user => {
              if ( user.id == response.data.id ) {
                user = response.data
              }
              return user
            })

            commit('SET_USERS', result)
          })
      } catch (e) {
        dispatch("setError", e, { root: true });
        throw e;
      }
    },

    async deleteUser({ dispatch, commit, state }, data) {
      try {
        await this._vm.$axios
          .delete(`users/${data.id}`, data)
          .then(async response => {
            let result = state.data.filter(user => {
              return user.id != data.id
            })

            commit('SET_USERS', result)
          })
      } catch (e) {
        dispatch("setError", e, { root: true });
        throw e;
      }
    },
  }
};
