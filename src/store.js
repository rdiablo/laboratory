import Vue from 'vue'
import Vuex from 'vuex'
import fetch from './utils/request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: {
      todo: [],
      inProgress: [],
      done: [],
    },
    nextId: 1,
  },
  mutations: {
    test(param) {
      return fetch.getApi('/home', param)
    },
    addItem(state, item) {
      state.items.todo.push(Object.assign(item, { id: state.nextId }));
      state.nextId += 1;
    },
    updateItems(state, { items, id }) {
      state.items[id] = items;
    },
  },
  actions: {
    // test(context, param) {
    //   return admin.test(param)
    // }
  },
  getters: {
  }
})
