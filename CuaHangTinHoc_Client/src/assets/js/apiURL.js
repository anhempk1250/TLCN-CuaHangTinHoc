var apiConfig = require('../../configs/api.json')
var apiAddress = apiConfig.api_url

var apiUrl = {
  products: apiAddress + '/products',
  productImages: apiAddress + "/images"
}

exports.apiUrl = apiUrl