export default {
  product_request(state) {
    state.productState.loading = true
  },
  product_success(state, list) {
    state.productState.loading = false
    state.productState.list = list
    state.productState.success = true
  },
  product_error(state) {
    state.productState.loading = false
    state.productState.error = true
  },
  product1_request(state) {
    state.productState.loading = true
  },
  product1_success(state, object) {
    state.productState.loading = false
    state.productState.object = object
    state.productState.success = true
  },
  product1_error(state) {
    state.productState.loading = false
    state.productState.error = true
  },
  productDetails_request(state) {
    state.productDetailsState.loading = true
  },
  productDetails_success(state, object) {
    state.productDetailsState.loading = false
    state.productDetailsState.object = object
    state.productDetailsState.success = true
  },
  productDetails_error(state) {
    state.productDetailsState.loading = false
    state.productDetailsState.error = true
  },
  productCategories_request(state) {
    state.productCategoriesState.loading = true
  },
  productCategories_success(state, list) {
    state.productCategoriesState.loading = false
    state.productCategoriesState.list = list
    state.productCategoriesState.success = true
  },
  productCategories_error(state) {
    state.productCategoriesState.loading = false
    state.productCategoriesState.error = true
  },
  producter_request(state) {
    state.producerState.loading = true
  },
  producer_success(state, list) {
    state.producerState.loading = false
    state.producerState.list = list
    state.producerState.success = true
  },
  producer_error(state) {
    state.producerState.loading = false
    state.producerState.error = true
  },
  productType_request(state) {
    state.productTypeState.loading = true
  },
  productType_success(state, data) {
    state.productTypeState.loading = false
    state.productTypeState.list = data.list
    console.log(data.list)
    state.productTypeState.success = true
  },
  productType_error(state) {
    state.productTypeState.loading = false
    state.productTypeState.error = true
  },
  productHistory_ADD(state, product) {
    for (let i = 0; i < state.productHistory.list.length; i++) {
      if (state.productHistory.list[i].id == product.id)
        return -1;
    }
    state.productHistory.list.push(product);
    localStorage.setItem('productHistoryList', JSON.stringify(state.productHistory.list));
  },
  productHistory_UPDATE(state, list) {
    if(list) {
      state.productHistory.list = JSON.parse(list)
    }
  },
  categoryList_request(state) {
    state.categoryState.loading = true
  },
  categoryList_success(state, list) {
    state.categoryState.loading = false
    state.categoryState.list = list
    state.categoryState.success = true
  },
  categoryList_error(state) {
    state.categoryState.loading = false
    state.categoryState.error = true
  },

  storeProducer_request(state) {
    state.store_producerState.loading = true
  },
  storeProducer_success(state, data) {
    state.store_producerState.loading = false
    state.store_producerState.list = data.list
    state.store_producerState.success = true
  },
  storeProducer_error(state) {
    state.store_producerState.loading = false
    state.store_producerState.error = true
  },
  customerAccount_request(state) {
    state.customerAccountState.loading = true
  },
  customerAccount_success(state, data) {
    state.customerAccountState.loading = false
    state.customerAccountState.success = true
    if (data.user) {
      state.customerAccountState.object = data.user;
    }
    if (data.msg)
      state.customerAccountState.msg = data.msg
    if (data.token) {
      state.customerAccountState.token = data.token
      localStorage.ctoken = data.token
    }

    if (data.userName) {
      state.customerAccountState.object.name = data.userName
      localStorage.userName = data.userName
    }

  },
  customerAccount_error(state) {
    state.customerAccountState.loading = false
    state.customerAccountState.error = true
  },
  customerLogout(state) {
    localStorage.userName = '';
    localStorage.removeItem("ctoken");
    localStorage.removeItem("cuserName");
    state.customerAccountState.object = {};
  },
  storeCategory_request(state) {
    state.store_categoryState.loading = true
  },
  storeCategory_success(state, data) {
    if (data.errorToken) {
      localStorage.removeItem('token');
      //location.reload();
    }
    state.store_categoryState.loading = false;
    state.store_categoryState.success = true;
    state.store_categoryState.list = data.list;
    state.store_categoryState.msg = data.msg;
    state.store_categoryState.object = data.object;
  },
  storeCategory_error(state) {
    state.store_categoryState.loading = false
    state.store_categoryState.error = true
  },
  storeOrder_request(state) {
    state.store_orderState.loading = true
  },
  storeOrder_success(state, data) {
    state.store_orderState.loading = false;
    state.store_orderState.success = true;
    state.store_orderState.list = data.list;
    state.store_orderState.msg = data.msg;
    state.store_orderState.object = data.object;
  },
  storeOrder_error(state) {
    state.store_orderState.loading = false
    state.store_orderState.error = true
  },
  storeProduct_request(state) {
    state.store_productState.loading = true
  },
  storeProduct_success(state, data) {
    state.store_productState.loading = false
    state.store_productState.list = data.list
    state.store_productState.success = true
  },
  storeProduct_error(state) {
    state.store_productState.loading = false
    state.store_productState.error = true
  },
  authenState_request(state) {
    state.store_authenState.loading = true
  },
  authenState_success(state, data) {
    state.store_authenState.loading = false;
    state.store_authenState.success = true;
    if(data.msg)
      state.store_authenState.msg = data.msg.msg;
    state.store_authenState.list = data.list;
    state.store_authenState.object = data.employee;
    state.store_authenState.token = data.token;
    localStorage.userName = data.userName;
    if (data.errorToken) {
      state.store_authenState.msg = data.errorToken;
      
    }
  },
  authenState_error(state) {
    state.store_authenState.loading = false
    state.store_authenState.error = true
  },
  storeProductType_request(state) {
    state.store_productTypeState.loading = true
  },
  storeProductType_success(state, data) {
    state.store_productTypeState.loading = false
    state.store_productTypeState.list = data.list
    state.store_productTypeState.success = true
  },
  storeProductType_error(state) {
    state.store_productTypeState.loading = false
    state.store_productTypeState.error = true
  },
  storeCustomer_request(state) {
    state.store_customerState.loading = true
  },
  storeCustomer_success(state, data) {
    state.store_customerState.loading = false
    state.store_customerState.list = data.list
    state.store_customerState.success = true
  },
  storeCustomer_error(state) {
    state.store_customerState.loading = false
    state.store_customerState.error = true
  },
  storeOrderStatus_request(state) {
    state.store_orderStatus_State.loading = true
  },
  storeOrderStatus_success(state, data) {
    state.store_orderStatus_State.loading = false
    state.store_orderStatus_State.list = data.list
    state.store_orderStatus_State.success = true
  },
  storeOrderStatus_error(state) {
    state.store_orderStatus_State.loading = false
    state.store_orderStatus_State.error = true
  }
}
