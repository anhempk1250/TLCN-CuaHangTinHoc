import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import { store } from './store/store.js'
import VueApexCharts from 'vue-apexcharts'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
window.$ = require('jquery')
window.JQuery = require('jquery')

Vue.component('apexchart', VueApexCharts)


Axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';



Vue.prototype.$http = Axios

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
