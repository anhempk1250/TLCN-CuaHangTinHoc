import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import { store } from './store/store.js'
import VueApexCharts from 'vue-apexcharts'

Vue.use(BootstrapVue)
Vue.prototype.$http = Axios
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('apexchart', VueApexCharts)



Vue.prototype.$http = Axios

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
