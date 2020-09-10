import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  mutations: {
    addUserInfo(state, newVl) {
      state.userInfo = newVl;
    },
    delUserInfo(state) {
      state.userInfo = null;
    }
  },
  actions: {
  },
  modules: {
  }
})
