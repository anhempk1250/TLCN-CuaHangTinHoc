import axios from 'axios'
import { CommonService } from '../service/common.service';
var commonService = new CommonService();

const apiConfig = require('../assets/js/apiURL').apiUrl
export default {
  updateProductCountInCart({ commit }) {
    if (localStorage.cart) {
      commit('updateProductCount')
    }
  },
  getProductList({ commit }) {
    const apiUrl = apiConfig.products
    return new Promise((resolve, reject) => {
      commit('product_request')
      axios.get(apiUrl)
        .then(function (response) {
          commit('product_success', response.data)
          //////console.log(response.data, 'success')
          resolve(response)
        })
        .catch(function (err) {
          commit('product_error')
          //////console.log(err, 'errer')
          reject(err)
        })
    })
  },
  getProduct({ commit }, id) {
    const apiUrl = apiConfig.product
    return new Promise((resolve, reject) => {
      commit('product1_request')
      axios.get(apiUrl, { params: { id: id } })
        .then(function (response) {
          commit('product1_success', response.data)
          //////console.log(response.data, 'success')
          resolve(response)
        })
        .catch(function (err) {
          commit('product1_error')
          //////console.log(err, 'errer')
          reject(err)
        })
    })
  },
  getProductDetail({ commit }, product_id) {
    const apiUrl = apiConfig.productDetails
    return new Promise((resolve, reject) => {
      commit('productDetails_request')
      ////console.log(product_id, 'vinh');
      axios.get(apiUrl, { params: { id: product_id } })
        .then(function (response) {
          commit('productDetails_success', response.data)
          ////console.log(response.data, 'action detail')
          resolve(resolve)
        })
        .catch(function (err) {

          commit('productDetails_error')
          reject(err)
        })
    })

  },
  getCommentProductList({ commit }, product_id) {
    const apiUrl = apiConfig.commentProduct
    return new Promise((resolve, reject) => {
      commit('commentProductList_request')
      axios.get(apiUrl, { params: { id: product_id } })
        .then(function (response) {
          commit('commentProductList_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('commentProductList_error')
          reject(err)
        })
    })

  },
  getProductCategory({ commit }) {
    //////console.log(apiConfig)
    const apiUrl = apiConfig.productCategories
    commit('productCategories_request')
    axios.get(apiUrl)
      .then(function (response) {
        commit('productCategories_success', response.data)
        //////console.log(response.data, 'action category')
      })
      .catch(function () {
        commit('productCategories_error')
      })
  },
  getProducerList({ commit }) {
    ////////console.log(apiConfig)
    const apiUrl = apiConfig.producer
    commit('producter_request')

    axios.get(apiUrl)
      .then(function (response) {
        commit('producer_success', response.data)
        ////////console.log(response.data,'action producer')
      })
      .catch(function () {
        commit('producer_error')
      })
  },
  getProductTypeList({ commit }) {
    ////////console.log(apiConfig)
    const apiUrl = apiConfig.productType
    commit('productType_request')

    axios.get(apiUrl)
      .then(function (response) {
        commit('productType_success', response.data)
        ////////console.log(response.data,'action product type')
      })
      .catch(function () {
        commit('productType_error')
      })
  },
  addProductHistory({ commit }, product) {
    commit('productHistory_ADD', product)
    //////console.log(product, 'action nenenen')
  },
  updateProductHistory({ commit }, list) {
    commit('productHistory_UPDATE', list)
  },
  getCategoryList({ commit }) {
    ////////console.log(apiConfig)
    const apiUrl = apiConfig.categories
    return new Promise((resolve, reject) => {
      commit('categoryList_request')
      axios.get(apiUrl)
        .then(function (response) {
          commit('categoryList_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('categoryList_error')
          reject(err)
        })
    })
  },
  getStoreProductList({ commit }) {
    const apiUrl = apiConfig.store_product
    return new Promise((resolve, reject) => {
      commit('storeProduct_request')
      axios.get(apiUrl, { params: { token: localStorage.token } })
        .then(function (response) {
          commit('storeProduct_success', response.data)
          commonService.checkErrorToken(response);
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProduct_error')
          reject(err)
        })
    })
  },
  insertAccountCustomer({ commit }, customerAccount) {
    const apiUrl = apiConfig.customerRegister
    let data = {
      name: customerAccount.name,
      id: customerAccount.id,
      password: customerAccount.password,
      phone: customerAccount.phone,
      address: customerAccount.address
    }
    console.log(commit)
    return new Promise((resolve, reject) => {
      axios.post(apiUrl, data)
        .then(function (response) {
          resolve(response)
        })
        .catch(function (err) {
          reject(err)
        })
    })
  },
  checkLoginCustomer({ commit }) {
    const apiUrl = apiConfig.checkLoginCustomer
    return new Promise((resolve, reject) => {
      let data = {
        token: localStorage.ctoken
      }
      commit('customerAccount_request')
      axios.get(apiUrl, { params: data })
        .then(function (response) {
          commit('customerAccount_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('customerAccount_error')
          reject(err)
        })
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
            name: category.name,
            property: category.propertyString,
            summaryName: category.summaryName
          }
        })
        .then(function (response) {
          commit('storeCategory_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeCategory_error')
          reject(err)
          //////console.log(err);
        })
    })
  },
  updateStoreCategory({ commit }, category, type) {
    const apiUrl = apiConfig.store_category
    return new Promise((resolve, reject) => {
      commit('storeCategory_request')
      //////console.log(category)
      axios.patch(apiUrl, { category: category },
        {
          params: {
            token: localStorage.token,
            _id: category._id,
            id: category.id,
            name: category.name,
            property: category.propertyString,
            summaryName: category.summaryName,
            typeUpdate: type
          }
        })
        .then(function (response) {
          commit('storeCategory_success', response.data)
          //////console.log(response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeCategory_error')
          reject(err)
          //////console.log(err);
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
          //////console.log(response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeCategory_error')
          reject(err)
          //////console.log(err);
        })
    })
  },
  getStoreCategory({ commit }) {
    const apiUrl = apiConfig.store_category
    return new Promise((resolve, reject) => {
      commit('storeCategory_request')
      axios.get(apiUrl, { params: { token: localStorage.token } })
        .then(function (response) {
          commit('storeCategory_success', response.data)
          ////console.log(response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeCategory_error')
          reject(err)
          //////console.log(err);
        })
    })
  },
  storeLogin({ commit }, employeeAccount) {
    const apiUrl = apiConfig.store_authen
    return new Promise((resolve, reject) => {
      commit('authenState_request')
      axios.get(apiUrl,
        {
          params: {
            id: employeeAccount.id,
            password: employeeAccount.password,
            employee: true
          }
        })
        .then(function (response) {
          commit('authenState_success', response.data)
          ////console.log(response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('authenState_error')
          reject(err)
          //////console.log(err);
        })
    })
  },
  storeCheckToken({ commit }) {
    const apiUrl = apiConfig.store_checkToken
    return new Promise((resolve, reject) => {
      commit('authenState_request')
      axios.get(apiUrl,
        {
          params: {
            token: localStorage.token,
            employee: true
          }
        })
        .then(function (response) {
          commit('authenState_success', response.data)
          //////console.log(response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('authenState_error')
          reject(err)
          //////console.log(err);
        })
    })
  },
  getStoreProducer({ commit }) {
    const apiUrl = apiConfig.store_producer;
    return new Promise((resolve, reject) => {
      commit('storeProducer_request')
      axios.get(apiUrl,
        {
          params: {
            token: localStorage.token, employee: true
          }
        })
        .then(function (response) {
          commit('storeProducer_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProducer_error')
          reject(err)
        })
    })
  },
  getStoreCategoryFromProductPage({ commit }) {
    const apiUrl = apiConfig.store_categoryFromProductPage
    return new Promise((resolve, reject) => {
      commit('storeCategory_request')
      axios.get(apiUrl, { params: { token: localStorage.token }, employee: true })
        .then(function (response) {
          commit('storeCategory_success', response.data)
          ////console.log(response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeCategory_error')
          reject(err)
          //////console.log(err);
        })
    })
  },
  getStoreProducerFromProductPage({ commit }) {
    const apiUrl = apiConfig.store_producerFromProductPage;
    return new Promise((resolve, reject) => {
      commit('storeProducer_request')
      axios.get(apiUrl,
        {
          params: {
            token: localStorage.token, employee: true
          }
        })
        .then(function (response) {
          commit('storeProducer_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProducer_error')
          reject(err)
        })
    })
  },
  insertStoreProduct({ commit }, product) {
    const apiUrl = apiConfig.store_insertProduct
    //////console.log(product.form);
    return new Promise((resolve, reject) => {
      commit('storeProduct_request')
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        token: localStorage.token
      }
      let formData = new FormData();
      formData.append('image1', product.images[0]);
      formData.append('image2', product.images[1]);
      formData.append('image3', product.images[2]);
      formData.append('image4', product.images[3]);
      formData.append('id', product.id);
      formData.append('name', product.name);
      formData.append('product_category_id', product.product_category_id);
      formData.append('producer_id', product.producer_id);
      formData.append('productCount', product.productCount);
      formData.append('price', product.price);
      formData.append('cost_price', product.cost_price);
      formData.append('property', product.propertyString);
      formData.append('token', localStorage.token);
      ////console.log(formData);
      axios.post(apiUrl, formData, config)
        .then(function (response) {
          commit('storeProduct_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProduct_error')
          reject(err)
        })
    })
  },
  updateStoreProduct({ commit }, product) {
    const apiUrl = apiConfig.store_updateProduct
    return new Promise((resolve, reject) => {
      commit('storeProduct_request')
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        token: localStorage.token
      }
      let formData = new FormData();
      formData.append('image1', product.images[0]);
      formData.append('image2', product.images[1]);
      formData.append('image3', product.images[2]);
      formData.append('image4', product.images[3]);
      formData.append('id', product.id);
      formData.append('name', product.name);
      formData.append('product_category_id', product.product_category_id);
      formData.append('producer_id', product.producer_id);
      formData.append('productCount', product.productCount);
      formData.append('price', product.price);
      formData.append('cost_price', product.cost_price);
      formData.append('property', product.propertyString);
      formData.append('token', localStorage.token);
      ////console.log(formData);
      axios.post(apiUrl, formData, config)
        .then(function (response) {
          commit('storeProduct_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProduct_error')
          reject(err)
        })
    })
  },
  deleteStoreProduct({ commit }, product) {
    const apiUrl = apiConfig.store_product
    return new Promise((resolve, reject) => {
      commit('storeProduct_request')
      const params = {
        id: product.id,
        token: localStorage.token
      }
      axios.delete(apiUrl, { params: params })
        .then(function (response) {
          commit('storeProduct_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProduct_error')
          reject(err)
        })
    })
  },
  customerLogin({ commit }, customerAccount) {
    let apiUrl = apiConfig.customerLogin;
    return new Promise((resolve, reject) => {
      commit('customerAccount_request')
      axios.get(apiUrl,
        { params: customerAccount })
        .then(function (response) {
          commit('customerAccount_success', response.data)
          //////console.log(response.data);
          resolve(response)
        })
        .catch(function (err) {
          commit('customerAccount_error')
          reject(err)
        })
    })
  },
  customerLoginSocial({ commit }, customerAccount) {
    let apiUrl = apiConfig.customerLoginSocial;
    return new Promise((resolve, reject) => {
      commit('customerAccount_request')
      axios.get(apiUrl,
        { params: customerAccount })
        .then(function (response) {
          commit('customerAccount_success', response.data)
          //console.log(response.data);
          resolve(response)
        })
        .catch(function (err) {
          commit('customerAccount_error')
          reject(err)
        })
    })
  },
  updateCustomer({ commit }, customerAccount) {
    let apiUrl = apiConfig.customer;
    customerAccount.token = localStorage.ctoken;
    return new Promise((resolve, reject) => {
      commit('customerAccount_request')
      axios.patch(apiUrl, {},
        { params: customerAccount })
        .then(function (response) {
          commit('customerAccount_success', response.data)
          //console.log(response.data);
          resolve(response)
        })
        .catch(function (err) {
          commit('customerAccount_error')
          reject(err)
        })
    })
  },
  customerOrder({ commit }, order) {
    let apiUrl = apiConfig.customerOrder;
    return new Promise((resolve, reject) => {
      //commit('customerOrder_request')
      axios.post(apiUrl, {},
        { params: order })
        .then(function (response) {
          //  commit('customerOrder_success', response.data)
          //console.log(response.data);
          resolve(response)
        })
        .catch(function (err) {
          commit('customerOrder_error')
          reject(err)
        })
    })
  },
  getCustomerOrder({ commit }) {
    let apiUrl = apiConfig.customerOrder;
    return new Promise((resolve, reject) => {
      commit('customerOrder_request')
      axios.get(apiUrl, { params: { token: localStorage.ctoken } })
        .then(function (response) {
          commit('customerOrder_success', response.data)
          //console.log(response.data);
          resolve(response)
        })
        .catch(function (err) {
          commit('customerOrder_error')
          reject(err)
        })
    })
  },
  getCustomerOrderSuccess({ commit }) {
    let apiUrl = apiConfig.customerOrderSuccess;
    return new Promise((resolve, reject) => {
      commit('customerOrderSs_request')
      axios.get(apiUrl, { params: { token: localStorage.ctoken } })
        .then(function (response) {
          commit('customerOrderSs_success', response.data)
          //console.log('day ne quoan', response.data);
          resolve(response)
        })
        .catch(function (err) {
          commit('customerOrderSs_error')
          reject(err)
        })
    })
  },
  getCustomerOrderComment({ commit }) {
    let apiUrl = apiConfig.customerOrderComment;
    return new Promise((resolve, reject) => {
      commit('customerOrderComment_request')
      axios.get(apiUrl, { params: { token: localStorage.ctoken } })
        .then(function (response) {
          commit('customerOrderComment_success', response.data)
          //console.log('day ne quoan', response.data);
          resolve(response)
        })
        .catch(function (err) {
          commit('customerOrderComment_error')
          reject(err)
        })
    })
  },
  insertOrderComment({ commit }, order_product) {
    order_product.token = localStorage.ctoken;
    let apiUrl = apiConfig.customerInsertComment;
    return new Promise((resolve, reject) => {
      commit('customerOrderSs_request')
      axios.post(apiUrl, {}, { params: order_product })
        .then(function (response) {
          commit('customerOrderSs_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('customerOrderSs_error')
          reject(err)
        })
    })
  },
  cancelCustomerOrder({ commit }, order) {
    order.token = localStorage.ctoken;
    let apiUrl = apiConfig.customerOrder;
    return new Promise((resolve, reject) => {
      commit('customerOrder_request')
      axios.delete(apiUrl,
        { params: order })
        .then(function (response) {
          commit('customerOrder_success', response.data)
          //console.log(response.data);
          resolve(response)
        })
        .catch(function (err) {
          commit('customerOrder_error')
          reject(err)
        })
    })
  },
  customerLogout({ commit }) {
    commit('customerLogout')
  },
  getStoreOrderList({ commit }) {
    const apiUrl = apiConfig.store_order;
    return new Promise((resolve, reject) => {
      commit('storeOrder_request')
      axios.get(apiUrl,
        {
          params: {
            token: localStorage.token
          }
        })
        .then(function (response) {
          commit('storeOrder_success', response.data)
          ////console.log(response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeOrder_error')
          reject(err)
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
          ////console.log(response.data, 'type')
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProductType_error')
          reject(err)
          //////console.log(err);
        })
    })
  },
  getStoreProductListFromProductTypePage({ commit }) {
    const apiUrl = apiConfig.store_productListFromProductTypePage
    return new Promise((resolve, reject) => {
      commit('storeProduct_request')
      axios.get(apiUrl, { params: { token: localStorage.token } })
        .then(function (response) {
          commit('storeProduct_success', response.data)
          ////console.log(response.data);
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProduct_error')
          reject(err)
        })
    })
  },
  insertStoreProductType({ commit }, type) {
    type.token = localStorage.token;
    const apiUrl = apiConfig.store_productType;
    return new Promise((resolve, reject) => {
      commit('storeProductType_request')
      axios.post(apiUrl, {},
        {
          params: type
        })
        .then(function (response) {
          commit('storeProductType_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProductType_error')
          reject(err)
          //////console.log(err);
        })
    })
  },
  updateStoreProductType({ commit }, type) {
    type.token = localStorage.token;
    const apiUrl = apiConfig.store_productType;
    return new Promise((resolve, reject) => {
      commit('storeProductType_request')
      axios.patch(apiUrl, {},
        {
          params: type
        })
        .then(function (response) {
          commit('storeProductType_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProductType_error')
          reject(err)
          //////console.log(err);
        })
    })
  },
  deleteStoreProductType({ commit }, type) {
    type.token = localStorage.token;
    const apiUrl = apiConfig.store_productType;
    return new Promise((resolve, reject) => {
      commit('storeProductType_request')
      axios.delete(apiUrl,
        {
          params: type
        })
        .then(function (response) {
          commit('storeProductType_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProductType_error')
          reject(err)
          //////console.log(err);
        })
    })
  },
  addStoreProductToType({ commit }, productWithType) {
    productWithType.token = localStorage.token;
    const apiUrl = apiConfig.storeProductWithType;
    return new Promise((resolve, reject) => {
      commit('storeProductType_request')
      axios.post(apiUrl, {},
        {
          params: productWithType
        })
        .then(function (response) {
          commit('storeProductType_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProductType_error')
          reject(err)
          //////console.log(err);
        })
    })
  },
  deleteStoreProductFromType({ commit }, productWithType) {
    productWithType.token = localStorage.token;
    const apiUrl = apiConfig.storeProductWithType;
    return new Promise((resolve, reject) => {
      commit('storeProductType_request')
      axios.delete(apiUrl,
        {
          params: productWithType
        })
        .then(function (response) {
          commit('storeProductType_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeProductType_error')
          reject(err)
          //////console.log(err);
        })
    })
  },
  getCustomerList({ commit }) {
    const apiUrl = apiConfig.store_customer
    return new Promise((resolve, reject) => {
      commit('storeCustomer_request')
      axios.get(apiUrl, { params: { token: localStorage.token } })
        .then(function (response) {
          commit('storeCustomer_success', response.data)
          ////console.log(response.data,'cus');
          resolve(response)
        })
        .catch(function (err) {
          commit('storeCustomer_error')
          reject(err)
        })
    })
  },
  insertStoreOrder({ commit }, order) {
    order.token = localStorage.token;
    const apiUrl = apiConfig.store_order;
    return new Promise((resolve, reject) => {
      commit('storeOrder_request')
      axios.post(apiUrl, {},
        {
          params: order
        })
        .then(function (response) {
          commit('storeOrder_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeOrder_error')
          reject(err)
        })
    })
  },
  getOrderStatusList({ commit }) {
    const apiUrl = apiConfig.store_orderStatus;
    return new Promise((resolve, reject) => {
      commit('storeOrderStatus_request')
      axios.get(apiUrl, { params: { token: localStorage.token } })
        .then(function (response) {
          commit('storeOrderStatus_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeOrderStatus_error')
          reject(err)
        })
    })
  },
  confirmStoreOrder({ commit }, order) {
    order.token = localStorage.token;
    const apiUrl = apiConfig.store_order;
    return new Promise((resolve, reject) => {
      commit('storeOrder_request')
      axios.patch(apiUrl, {},
        {
          params: order
        })
        .then(function (response) {
          commit('storeOrder_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeOrder_error')
          reject(err)
        })
    })
  },
  cancelStoreOrder({ commit }, order) {
    order.token = localStorage.token;
    const apiUrl = apiConfig.store_cancelOrder;
    return new Promise((resolve, reject) => {
      commit('storeOrder_request')
      axios.patch(apiUrl, {},
        {
          params: order
        })
        .then(function (response) {
          commit('storeOrder_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeOrder_error')
          reject(err)
        })
    })
  },
  getProductListFromProductListPage({ commit }) {
    const apiUrl = apiConfig.productFromProductListPage
    return new Promise((resolve, reject) => {
      commit('product_request')
      axios.get(apiUrl, { params: { token: localStorage.token } })
        .then(function (response) {
          commit('product_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('product_error')
          reject(err)
        })
    })
  },
  getProductCategoryFromProductListPage({ commit }) {
    //////console.log(apiConfig)
    const apiUrl = apiConfig.productCategoryFromProductListPage
    return new Promise((resolve, reject) => {
      commit('productCategories_request')
      axios.get(apiUrl)
        .then(function (response) {
          commit('productCategories_success', response.data)
          resolve(response)
          //////console.log(response.data, 'action category')
        })
        .catch(function (err) {
          commit('productCategories_error')
          reject(err)
        })
    })
  },
  getProducerListFromProductListPage({ commit }) {
    ////////console.log(apiConfig)
    const apiUrl = apiConfig.producerFromProductListPage
    return new Promise((resolve, reject) => {
      commit('producter_request')

      axios.get(apiUrl)
        .then(function (response) {
          commit('producer_success', response.data)
          resolve(response)
          ////////console.log(response.data,'action producer')
        })
        .catch(function (err) {
          commit('producer_error')
          reject(err)

        })
    })
  },
  insertAccountEmployee({ commit }, employeeAccount) {
    const apiUrl = apiConfig.store_employee;
    let data = {
      name: employeeAccount.name,
      id: employeeAccount.id,
      password: employeeAccount.password,
      phone: employeeAccount.phone,
      address: employeeAccount.address,
      token: localStorage.token
    }
    console.log(commit)
    return new Promise((resolve, reject) => {
      axios.post(apiUrl, data)
        .then(function (response) {
          resolve(response)
        })
        .catch(function (err) {
          reject(err)
        })
    })
  },
  updateAccountEmployee({ commit }, employeeAccount) {
    const apiUrl = apiConfig.store_employee;
    let data = {
      name: employeeAccount.name,
      id: employeeAccount.id,
      password: employeeAccount.password,
      phone: employeeAccount.phone,
      address: employeeAccount.address,
      changePassword: employeeAccount.changePassword,
      token: localStorage.token
    }
    console.log(commit)
    return new Promise((resolve, reject) => {
      commit('storeEmployee_request');
      axios.patch(apiUrl, {}, { params: data })
        .then(function (response) {
          commit('storeEmployee_success', response.data);
          resolve(response)
        })
        .catch(function (err) {
          commit('storeEmployee_error', err);
          reject(err)
        })
    })
  },
  getInfoEmployee({ commit }) {
    const apiUrl = apiConfig.store_infor;
    return new Promise((resolve, reject) => {
      let data = {
        token: localStorage.token
      }
      commit('storeEmployee_request');
      axios.get(apiUrl, { params: data })
        .then(function (response) {
          commit('storeEmployee_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeEmployee_error', err)
          reject(err)
        })
    })
  },
  getEmployeeAccountList({ commit }) {
    const apiUrl = apiConfig.store_employee;
    let data = {
      token: localStorage.token
    }
    return new Promise((resolve, reject) => {
      commit('storeEmployee_request');
      axios.get(apiUrl, { params: data })
        .then(function (response) {
          commit('storeEmployee_success', response.data)
          resolve(response)
        })
        .catch(function (err) {
          commit('storeEmployee_error', err)
          reject(err)
        })
    })
  }
}