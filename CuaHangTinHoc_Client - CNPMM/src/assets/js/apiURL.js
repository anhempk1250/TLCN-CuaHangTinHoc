var apiConfig = require('../../configs/api.json')
var apiAddress = apiConfig.api_url
var apiAddressHttps = apiConfig.api_url_https;
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
  store_categoryFromProductPage: apiAddress + "/storeCategoryFromProductPage",
  store_producerFromProductPage: apiAddress + "/storeProducerFromProductPage",
  store_productListFromProductTypePage: apiAddress + "/storeProductListFromProductTypePage",
  store_productType: apiAddress + "/storeProductType",
  store_checkToken: apiAddress + "/checkToken",
  store_producer: apiAddress + "/storeProducer",
  store_customer: apiAddress + "/storeCustomer",
  store_order: apiAddress + "/storeOrder",
  customerLogin: apiAddress + "/customerLogin",
  customerLoginFB: apiAddressHttps + "/auth/facebook",
  customerLoginGG: apiAddress + "/auth/google",
  customerOrderList : apiAddress + "/orderList",

}

exports.apiUrl = apiUrl