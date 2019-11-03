import axios from 'axios'

const apiConfig = require('../assets/js/apiURL').apiUrl
export default {
  getProductList({ commit }) {
    //console.log(apiConfig)
    const apiUrl = apiConfig.products
    commit('product_request')
    axios.get(apiUrl)
      .then(function (response) {
        commit('product_success', response.data)
        //console.log(response.data)
      })
      .catch(function () {
        commit('product_error')
      })
  },
  getProductDetail({ commit }, product_id) {
    //console.log(apiConfig)
    const apiUrl = apiConfig.productDetails
    commit('productDetails_request')

    axios.get(apiUrl, { params: { product_id: product_id } })
      .then(function (response) {
        commit('productDetails_success', response.data)
        //console.log(response.data,'action')
      })
      .catch(function () {
        commit('productDetails_error')
      })
  },
  getProductCategory({ commit }) {
    console.log(apiConfig)
    const apiUrl = apiConfig.productCategories
    commit('productCategories_request')

    axios.get(apiUrl)
      .then(function (response) {
        commit('productCategories_success', response.data)
        console.log(response.data, 'action category')
      })
      .catch(function () {
        commit('productCategories_error')
      })
  },
  getProducerList({ commit }) {
    //console.log(apiConfig)
    const apiUrl = apiConfig.producer
    commit('producter_request')

    axios.get(apiUrl)
      .then(function (response) {
        commit('producer_success', response.data)
        //console.log(response.data,'action producer')
      })
      .catch(function () {
        commit('producer_error')
      })
  },
  getProductTypeList({ commit }) {
    //console.log(apiConfig)
    const apiUrl = apiConfig.productType
    commit('productType_request')

    axios.get(apiUrl)
      .then(function (response) {
        commit('productType_success', response.data)
        //console.log(response.data,'action product type')
      })
      .catch(function () {
        commit('productType_error')
      })
  },
  addProductHistory({ commit }, product) {
    commit('productHistory_ADD', product)
    console.log(product, 'action nenenen')
  },
  updateProductHistory({ commit }, list) {
    commit('productHistory_UPDATE', list)
  },
  getCategoryList({ commit }) {
    //console.log(apiConfig)
    const apiUrl = apiConfig.categories
    commit('categoryList_request')
    axios.get(apiUrl)
      .then(function (response) {
        commit('categoryList_success', response.data)
        //console.log(response.data,'action categoryList')
      })
      .catch(function () {
        commit('categoryList_error')
      })
  },
  getStoreProductList({ commit }) {
    //console.log(apiConfig)
    const apiUrl = apiConfig.store_product
    commit('storeProduct_request')
    axios.get(apiUrl)
      .then(function (response) {
        commit('storeProduct_success', response.data)
        //console.log(response.data,'action categoryList')
      })
      .catch(function () {
        commit('storeProduct_error')
      })
  }
}