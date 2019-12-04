var apiConfig = require('../../configs/api.json')
var apiAddress = apiConfig.api_url

var apiUrl = {
  products: apiAddress + '/products',
  product: apiAddress + '/product',
  productDetails: apiAddress + '/productDetails',
  productCategories: apiAddress + '/productCategory',
  producer: apiAddress + "/producers",
  productType: apiAddress + "/productType",
  categories: apiAddress + "/categories",
  customerRegister: apiAddress + '/customerRegister',
  checkLoginCustomer: apiAddress + "/checkLoginCustomer",
  store_category: apiAddress + "/storeCategory",
  store_authen: apiAddress + "/storeAuthen",
  store_product: apiAddress + '/storeProduct',
  store_insertProduct: apiAddress + '/insertStoreProduct',
  store_updateProduct: apiAddress + '/updateStoreProduct',
  store_categoryFromProductPage: apiAddress + "/storeCategoryFromProductPage",
  store_producerFromProductPage: apiAddress + "/storeProducerFromProductPage",
  store_productType: apiAddress + "/storeProductType",
  store_productListFromProductTypePage: apiAddress + "/storeProductListFromProductTypePage",
  storeProductWithType: apiAddress + "/storeProductWithType",
  store_checkToken: apiAddress + "/checkToken",
  store_producer: apiAddress + "/storeProducer",
  store_order: apiAddress + "/storeOrder",
  store_orderStatus: apiAddress + "/storeOrderStatus",
  store_customer: apiAddress + "/storeCustomer",
  customerLogin: apiAddress + "/customerLogin",
  customerLoginFB: apiAddress + "/auth/facebook",
  customerLoginGG: apiAddress + "/auth/google",
  customerOrderList : apiAddress + "/orderList"
}

exports.apiUrl = apiUrl