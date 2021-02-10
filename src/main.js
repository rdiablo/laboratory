import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

import './styles/styles.scss'

Vue.config.productionTip = false

new Vue({
  mounted() {},
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
