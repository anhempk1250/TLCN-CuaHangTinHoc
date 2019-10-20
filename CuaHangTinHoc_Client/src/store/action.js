import axios from 'axios'

const apiConfig = require('../assets/js/apiURL').apiUrl
export default {
  getProductList({ commit }) {
    console.log(apiConfig)
    const apiUrl = apiConfig.products
    commit('product_request')
    axios.get(apiUrl)
      .then(function (response) {
        commit('product_success', response.data)
        console.log(response.data)
      })
      .catch(function () {
        commit('product_error')
      })
  },
  getProductImageList({ commit }) {
    console.log(apiConfig)
    const apiUrl = apiConfig.productImages
    commit('productImages_request')
    axios.get(apiUrl)
      .then(function (response) {
        commit('productImages_success', response.data)
      })
      .catch(function () {
        commit('productImages_error')
      })
  }
}