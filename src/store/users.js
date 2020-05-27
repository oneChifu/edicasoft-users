export default {
  namespaced: true,

  state: {
    data: [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Dou',
        email: 'johndou@test.test',
        address: {
          country: 'USA',
          city: 'New York',
          street: 'Main st.'
        }
      },
      {
        id: 2,
        firstname: 'Jack',
        lastname: 'Black',
        email: 'jack@test.test',
        address: {
          country: 'Canada',
          city: 'Toronto',
          street: 'Violet st.'
        }
      },
    ]
  },

  getters: {
    data(state) {
      return state.data;
    },
  },

  mutations: {
  },

  actions: {
    // async setUsers({ commit }, data) {
    //   commit('SET_USERS', data)
    // },
  }
};
