export default {
  namespaced: true,

  state: {
    data: [
      // {
      //   id: 1,
      //   firstname: 'John',
      //   lastname: 'Dou',
      //   email: 'johndou@test.test',
      //   address: {
      //     country: 'USA',
      //     city: 'New York',
      //     street: 'Main st.'
      //   }
      // },
      // {
      //   id: 2,
      //   firstname: 'Jack',
      //   lastname: 'Black',
      //   email: 'jack@test.test',
      //   address: {
      //     country: 'Canada',
      //     city: 'Toronto',
      //     street: 'Violet st.'
      //   }
      // },
      // {
      //   id: 3,
      //   firstname: 'John3',
      //   lastname: 'Dou',
      //   email: 'johndou@test.test',
      //   address: {
      //     country: 'USA',
      //     city: 'New York',
      //     street: 'Main st.'
      //   }
      // },
      // {
      //   id: 4,
      //   firstname: 'Jack4',
      //   lastname: 'Black',
      //   email: 'jack@test.test',
      //   address: {
      //     country: 'Canada',
      //     city: 'Toronto',
      //     street: 'Violet st.'
      //   }
      // },
      // {
      //   id: 5,
      //   firstname: 'John5',
      //   lastname: 'Dou',
      //   email: 'johndou@test.test',
      //   address: {
      //     country: 'USA',
      //     city: 'New York',
      //     street: 'Main st.'
      //   }
      // },
      // {
      //   id: 6,
      //   firstname: 'Jack6',
      //   lastname: 'Black',
      //   email: 'jack@test.test',
      //   address: {
      //     country: 'Canada',
      //     city: 'Toronto',
      //     street: 'Violet st.'
      //   }
      // },
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
