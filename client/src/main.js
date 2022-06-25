import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/tailwind.css'
import axios from 'axios'

import VueCookies from 'vue-cookies'
import { CookieStorageManager } from '@/core/Storage/CookieStorageManager'
import { StorageService } from '@/core/Storage/StorageService'

Vue.use(VueCookies)
const storageManager = new CookieStorageManager(Vue.$cookies)
const storageService = new StorageService(storageManager)
Vue.prototype.$storageService = storageService
const userToken = storageService.getItem('token')
axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken.token
store.commit('setUserToken', userToken.token)

console.log('user token: ', userToken)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
