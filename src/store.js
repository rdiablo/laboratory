import Vue from 'vue'
import Vuex from 'vuex'
import fetch from './utils/request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tree: [],
  },
  mutations: {
    test(param) {
      return fetch.getApi('/home', param)
    }
  },
  actions: {
    test(context, param) {
      return admin.test(param)
    }
  },
  getters: {
  }
})
