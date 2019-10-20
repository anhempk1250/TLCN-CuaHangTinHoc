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
  productImages_request(state) {
    state.productImageState.loading = true
  },
  productImages_success(state, list) {
    state.productImageState.loading = false
    state.productImageState.list = list
    state.productImageState.success = true
  },
  productImages_error(state) {
    state.productImageState.loading = false
    state.productImageState.error = true
  }
}
