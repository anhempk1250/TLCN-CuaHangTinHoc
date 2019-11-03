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
    productTypeSate: {
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
    }
  },
  mutations,
  actions,
  getters
})