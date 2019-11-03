var apiConfig = require('../../configs/api.json')
var apiAddress = apiConfig.api_url

var apiUrl = {
  products: apiAddress + '/products',
  productDetails: apiAddress + '/productDetails',
  productCategories: apiAddress + '/productCategory',
  producer: apiAddress + "/producers",
  productType: apiAddress + "/productType",
  categories: apiAddress + "/categories",
  store_product: apiAddress + '/storeProducts'
}

exports.apiUrl = apiUrl