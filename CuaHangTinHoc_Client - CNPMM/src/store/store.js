import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'
import getters from './getter'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('access_token') || '',
    user: {},
    productState: {
      loading: false,
      list: [],
      object: {},
      success: false,
      error: false
    },
    productHistory: {
      list: []
    },
    productDetailsState: {
      loading: false,
      object: {},
      success: false,
      error: false
    },
    productCategoriesState: {
      loading: false,
      list: [],
      success: false,
      error: false
    },
    producerState: {
      loading: false,
      list: [],
      success: false,
      error: false
    },
    productTypeState: {
      loading: false,
      list: [],
      success: false,
      error: false
    },
    categoryState: {
      loading: false,
      list: [],
      success: false,
      error: false
    },
    store_productState: {
      loading: false,
      list: [],
      success: false,
      error: false
    },
    customerAccountState: {
      loading: false,
      list: [],
      object: {
        name: '',
        address: '',
        phone: '',
        email: '',
      },
      token: '',
      success: false,
      error: false,
      msg: ''
    },
    store_categoryState: {
      loading: false,
      list: [],
      object: {},
      token: '',
      errorToken: false,
      success: false,
      error: false,
      msg: '',
      employee: ''
    },
    store_productTypeState: {
      loading: false,
      list: [],
      object: {},
      token: '',
      errorToken: false,
      success: false,
      error: false,
      msg: ''
    },
    store_producerState: {
      loading: false,
      list: [],
      object: {},
      token: '',
      errorToken: false,
      success: false,
      error: false,
      msg: ''
    },
    store_authenState: {
      loading: false,
      list: [],
      object: {},
      token: '',
      success: false,
      error: false,
      msg: ''
    },
    store_orderState: {
      loading: false,
      list: [],
      object: {},
      token: '',
      success: false,
      error: false,
      msg: ''
    }
  },
  mutations,
  actions,
  getters
})