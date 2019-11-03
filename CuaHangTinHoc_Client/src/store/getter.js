export default {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  productList: state => state.productState.list,
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
  storeProductLoading: state => state.store_productState.loading
}
