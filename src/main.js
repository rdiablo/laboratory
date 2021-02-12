import Vue from 'vue'
import VueApollo from 'vue-apollo'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import axios from 'axios'

import './styles/styles.scss'


Vue.use(VueApollo)
Vue.config.productionTip = false

// 与 API 的 HTTP 连接
const httpLink = createHttpLink({
  // 你需要在这里使用绝对路径
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from ApplicationSettings if it exists
  // const token = ApplicationSettings.getString("token");
  const token = localStorage.getItem('JWT_TOKEN');

  // return the headers to the context so HTTP link can read them
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : null
      }
  }
})

// update apollo client as below
// const apolloClient = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache() // If you want to use then 
// })

// 缓存实现
const cache = new InMemoryCache()

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.JWT_TOKEN) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.Authorization = `token ${localStorage.JWT_TOKEN}`;
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });

// http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       console.log('axios:' + error.response.status);
//       switch (error.response.status) {
//         case 401:
//           // 返回 401 清除token信息并跳转到登录页面
//           store.commit('LOG_OUT');
//           router.replace({
//             path: 'login',
//             query: {redirect: router.currentRoute.fullPath}
//           });
//       }
//     }
//     return Promise.reject(error.response.data);   // 返回接口返回的错误信息
//   });

// Vue.prototype.$http = axios;



new Vue({
  mounted() {},
  vuetify,
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
