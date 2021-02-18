import Vue from 'vue'
import Vuex from 'vuex'
import fetch from './utils/request'
import axios from 'axios'
// import gql from 'graphql-tag'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    productAll: [],
    productPaginationAll: [],
    categoryAll: [],
    imageAll: [],
    uid: '',
    identifier: '',
    username: '',
    password: '',
    online: false,
    loading: false,
    disabled: false,
    items: {
      // 'to':[],
      // 'in':[],
      // 'done':[]
    },
    nextId: 1,
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    assignItems(state, items) {
      Object.assign(state.items, items);
    },
    destroyToken(state) {
      state.token = null
    },
    categoryData(state, categoryAll) {
      state.categoryAll = categoryAll
    },
    ProductData(state, productAll) {
      state.productAll = productAll
    },
    ProductPagination(state, productPaginationAll) {
      state.productPaginationAll = productPaginationAll
    },
    ProductImageInsert(state, image){

      state.imageAll.push({
         id: image.id,
         name: image.name,
      })
    },
    retrieveId(state, username) {        //取回用户ID
      state.uid = username
    },
    updateIdentifier (state, identifier) {
      state.identifier = identifier
    },

    updatePassword (state, password) {
      state.password = password
      state.online = true
    },

    setLoading (state, loading) {
      state.loading = loading
    },

    setDisabled (state, disabled) {
      state.disabled = disabled
    },
    test(param) {
      return fetch.getApi('/home', param)
    },
    addItem(state, item) {
      state.items.to.push(Object.assign(item, { id: state.nextId }));
      state.nextId += 1;
    },
    updateItems(state, { items, id }) {
      // state.items[id] = items;
      Vue.set(state.items, id, items)
    },
    getItems: state => {
      return state.items
    },
  },
  actions: {
    // test(context, param) {
    //   return admin.test(param)
    // }
    
    retrieveName(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      return new Promise((resolve, reject) => {
        axios.get('/user')
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
          repeat_password: data.repeat_password,
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
    // retrieveToken(context, credentials) {
    //   return new Promise((resolve, reject) => {
    //     axios.post('/login', {
    //       email: credentials.email,
    //       password: credentials.password,
    //     })
    //       .then(response => {
    //         const token = response.data.data.token
    //         localStorage.setItem('access_token', token)
    //         context.commit('retrieveToken', token)
    //         resolve(response)
    //         // console.log(response);
    //         // context.commit('addTodo', response.data)
    //       })
    //       .catch(error => {
    //         //console.log(error)
    //         reject(error)
    //       })
    //     })
    // },
    retrieveToken(context, credentials) {
      localStorage.setItem('JWT_TOKEN', credentials)
    },
    ProductData(context, credentials ){
      return new Promise((resolve, reject) => {
        axios.get('/products?page='+credentials.current_page)
          .then(response => {
            context.commit('ProductData', response.data.data)
            context.commit('ProductPagination', response.data.meta)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })

    },
    ProductImageInsert(context, credentials){
     return new Promise((resolve, reject) => {
        axios.post('/images',
          credentials,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
           })
          .then(response => {

            context.commit('ProductImageInsert', response.data.data)
            resolve(response)
          })
          .catch(error => {
            //console.log(error)
            reject(error)
          })
        })

    },
    CategoryProductData(context, credentials ){

      return new Promise((resolve, reject) => {
        axios.get('/product/cat/'+credentials.cat_id+'?page='+credentials.current_page)
          .then(response => {
            context.commit('ProductData', response.data.data)
            context.commit('ProductPagination', response.data.meta)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })

    },
    categoryData(context ){
      return new Promise((resolve, reject) => {
        axios.get('/product/categories')
          .then(response => {
            context.commit('categoryData', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })

    },
  },
  getters: {
    // getItems: (state) => (id) => {
    //   return state.items.find(item => item.id === id)
      // state.items.map((value) => {
      //   return value
      // })
      // return state.items
    // },
    loggedIn(state) {
      return state.token !== null
    },
    productGetters(state){
      return state.productAll
      
    },
    productPaginationGetters(state){
      return state.productPaginationAll
      
    },
    categoryGetters(state){
      return state.categoryAll
    }
  }
})
