import axios from 'axios'

const apiConfig = require('../assets/js/apiURL').apiUrl
export default {
  getProductList({ commit }) {
    const apiUrl = apiConfig.products
    commit('product_request')
    axios.get(apiUrl)
      .then(function (response) {
        commit('product_success', response.data)
        console.log(response.data, 'success')
      })
      .catch(function (err) {
        commit('product_error')
        console.log(err, 'errer')
      })
  },
  getProduct({ commit }, id) {
    const apiUrl = apiConfig.product
    commit('product1_request')
    axios.get(apiUrl, { params: { id: id } })
      .then(function (response) {
        commit('product1_success', response.data)
        console.log(response.data, 'success')
      })
      .catch(function (err) {
        commit('product1_error')
        console.log(err, 'errer')
      })
  },
  getProductDetail({ commit }, product_id) {
    console.log(product_id)
    const apiUrl = apiConfig.productDetails
    commit('productDetails_request')

    axios.get(apiUrl, { params: { id: product_id } })
      .then(function (response) {
        commit('productDetails_success', response.data)
        console.log(response.data, 'action detail')
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
    const apiUrl = apiConfig.store_product
    commit('storeProduct_request')
    axios.get(apiUrl, { params: { token: localStorage.token } })
      .then(function (response) {
        commit('storeProduct_success', response.data)
        console.log(response.data, 'action abc')
      })
      .catch(function () {
        commit('storeProduct_error')
      })
  },
  insertAccountCustomer({ commit }, customerAccount) {
    console.log('insert')
    const apiUrl = apiConfig.customerRegister
    let data = {
      name: customerAccount.name,
      email: customerAccount.email,
      password: customerAccount.password,
      phone: customerAccount.phone,
      address: customerAccount.address
    }
    commit('customerAccount_request')
    axios.post(apiUrl, data)
      .then(function (response) {
        commit('customerAccount_success', response.data)
        console.log(response.data, 'action customerAccount')
      })
      .catch(function () {
        commit('customerAccount_error')
      })
  },
  insertStoreCategory({ commit }, category) {
    const apiUrl = apiConfig.store_category
    return new Promise((resolve, reject) => {
      commit('storeCategory_request')
      axios.post(apiUrl, { category: category },
        {
          params: {
            token: localStorage.token,
            id: category.id,
            name: category.name,
            property: category.propertyString,
            summaryName: category.summaryName,
            employee_id: category.employee_id
          }
        })
        .then(function (response) {
          commit('storeCategory_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeCategory_error')
          reject(err)
          console.log(err);
        })
    })
  },
  updateStoreCategory({ commit }, category) {
    const apiUrl = apiConfig.store_category
    return new Promise((resolve, reject) => {
      commit('storeCategory_request')
      console.log(category)
      axios.put(apiUrl, { category: category },
        {
          params: {
            token: localStorage.token,
            _id: category._id,
            id: category.id,
            name: category.name,
            property: category.propertyString,
            summaryName: category.summaryName,
            employee_id: category.employee_id
          }
        })
        .then(function (response) {
          commit('storeCategory_success', response.data)
          console.log(response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeCategory_error')
          reject(err)
          console.log(err);
        })
    })
  },
  deleteStoreCategory({ commit }, catetgory) {
    const apiUrl = apiConfig.store_category
    return new Promise((resolve, reject) => {
      commit('storeCategory_request')
      axios.delete(apiUrl,
        {
          params: {
            token: localStorage.token,
            _id: catetgory._id,
            id: catetgory.id

          }
        })
        .then(function (response) {
          commit('storeCategory_success', response.data)
          console.log(response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeCategory_error')
          reject(err)
          console.log(err);
        })
    })
  },
  getStoreCategory({ commit }, token) {
    const apiUrl = apiConfig.store_category
    return new Promise((resolve, reject) => {
      commit('storeCategory_request')
      axios.get(apiUrl, { params: { token: token } })
        .then(function (response) {
          commit('storeCategory_success', response.data)
          console.log(response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeCategory_error')
          reject(err)
          console.log(err);
        })
    })
  },
  storeLogin({ commit }, employeeAccount) {
    const apiUrl = apiConfig.store_authen
    return new Promise((resolve, reject) => {
      commit('authenState_request')
      axios.post(apiUrl,
        {
          params: {
            id: employeeAccount.id,
            password: employeeAccount.password
          }
        })
        .then(function (response) {
          commit('authenState_success', response.data)
          console.log(response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('authenState_error')
          reject(err)
          console.log(err);
        })
    })
  },
  getStoreProductType({ commit }) {
    const apiUrl = apiConfig.store_productType;
    return new Promise((resolve, reject) => {
      commit('storeProductType_request')
      axios.get(apiUrl,
        {
          params: {
            token: localStorage.token
          }
        })
        .then(function (response) {
          commit('storeProductType_success', response.data)
          console.log(response.data, 'type')
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProductType_error')
          reject(err)
          console.log(err);
        })
    })
  },
  customerLogin({ commit }, customerAccount) {
    const apiUrl = apiConfig.customerLogin;
    return new Promise((resolve, reject) => {
      commit('customerAccount_request')
      axios.get(apiUrl,
        {
          params: {
            email: customerAccount.email,
            password: customerAccount.password
          }
        })
        .then(function (response) {
          commit('customerAccount_success', response.data)
          console.log(response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('customerAccount_error')
          reject(err)
          console.log(err);
        })
    })
  }
}