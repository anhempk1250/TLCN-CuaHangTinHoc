export default {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  productList: state => state.productState.list,
  productLoading: state => state.productState.loading,
  productImageList: state => state.productState.list,
  productImageLoading: state => state.productState.loading
}
