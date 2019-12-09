export default {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  productList: state => state.productState.list,
  productObject : state => state.producerState.object,
  productLoading: state => state.productState.loading,
  productDetailsObject: state => state.productDetailsState.object,
  productDetailsLoading: state => state.productDetailsState.loading,
  productCategoryList: state => state.productCategoriesState.list,
  productCategoryLoading: state => state.productCategoriesState.loading,
  producerList: state => state.producerState.list,
  producerLoading: state => state.producerState.loading,
  productTypeList: state => state.productTypeState.list,
  productTypeLoading: state => state.productTypeState.loading,
  productHistoryList: state => state.productHistory.list,
  categoryList: state => state.categoryState.list,
  categoryLoading: state => state.categoryState.loading,
  storeProductList: state => state.store_productState.list,
  storeProductLoading: state => state.store_productState.loading,
  customerAccountObject: state => state.customerAccountState.object,
  customerAccountLoading: state => state.customerAccountState.loading,
  customerOrderList: state => state.customer_orderState.list,
  customerOrderLoading: state => state.customer_orderState.loading,
  customerOrderSSList: state => state.customer_orderStateSs.list,
  customerOrderSSLoading: state => state.customer_orderStateSs.loading,
  customerOrderCommentList: state => state.customer_orderStateComment.list,
  customerOrderCommentLoading: state => state.customer_orderStateComment.loading,
  customerAccountMessage: state => state.customerAccountState.msg,
  storeCategoryList: state => state.store_categoryState.list,
  storeCategoryLoading: state => state.store_categoryState.loading,
  storeOrderList: state => state.store_orderState.list,
  storeOrderLoading: state => state.store_orderState.loading,
  storeAuthenMsg: state => state.store_authenState.msg,
  storeEmployeeAccount: state => state.store_authenState.object,
  storeCategory: state => state.store_categoryState,
  storeProduct: state => state.store_productState,
  storeProductTypeList: state => state.store_productTypeState.list,
  storeProductTypeLoading: state => state.store_productTypeState.loading,
  storeProducerList: state => state.store_producerState.list,
  storeProducerLoading: state => state.store_producerState.loading,
  storeCustomerList: state => state.store_customerState.list,
  storeCustomerLoading: state => state.store_customerState.loading,
  storeOrderStatusList: state => state.store_orderStatus_State.list,
  storeOrderStatusLoading: state => state.store_orderStatus_State.loading
}
