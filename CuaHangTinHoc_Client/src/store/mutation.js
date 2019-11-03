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
  productType_success(state, list) {
    state.productTypeState.loading = false
    state.productTypeState.list = list
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
    state.productHistory.list = JSON.parse(list)
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
  storeProduct_request(state) {
    state.store_productState.loading = true
  },
  storeProduct_success(state, list) {
    state.store_productState.loading = false
    state.store_productState.list = list
    state.store_productState.success = true
  },
  storeProduct_error(state) {
    state.store_productState.loading = false
    state.store_productState.error = true
  },
}
