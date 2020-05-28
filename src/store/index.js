import Vue from 'vue'
import Vuex from 'vuex'
import users from "./users";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },

  getters: {
    error(state) {
      return state.error;
    },
  },

  mutations: {
    SET_ERROR(state, error) {
      state.error = error;
    },
  
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },

  actions: {
  },
  
  modules: {
    users
  }
})
