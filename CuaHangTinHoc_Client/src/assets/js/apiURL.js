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
  store_productType: apiAddress + "/storeProductType",
  customerLogin: apiAddress + "/customerLogin"
}

exports.apiUrl = apiUrl