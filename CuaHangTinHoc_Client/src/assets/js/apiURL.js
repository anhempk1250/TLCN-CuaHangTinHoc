var apiConfig = require('../../configs/api.json')
var apiAddress = apiConfig.api_url

var apiUrl = {
  products: apiAddress + '/products',
  product: apiAddress + '/product',
  productDetails: apiAddress + '/productDetails',
  commentProduct: apiAddress + "/commentProduct",
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
  store_productTypeFromType: apiAddress +"/storeProductTypeFromType",
  store_productListFromProductTypePage: apiAddress + "/storeProductListFromProductTypePage",
  storeProductWithType: apiAddress + "/storeProductWithType",
  store_checkToken: apiAddress + "/checkToken",
  store_producer: apiAddress + "/storeProducer",
  store_order: apiAddress + "/storeOrder",
  store_cancelOrder: apiAddress +"/cancelStoreOrder",
  store_orderStatus: apiAddress + "/storeOrderStatus",
  store_customer: apiAddress + "/storeCustomer",
  store_employee: apiAddress + "/storeEmployee",
  store_infor: apiAddress + "/getInfoEmployee",
  customerLogin: apiAddress + "/customerLogin",
  customerLoginSocial: apiAddress + "/loginSocial",
  customer: apiAddress +"/customer",
  customerOrder : apiAddress + "/customerOrder",
  customerOrderSuccess: apiAddress + "/customerOrderSuccess",
  customerInsertComment: apiAddress + "/customerInsertComment",
  customerOrderComment: apiAddress + "/customerOrderComment",
  productFromProductListPage: apiAddress + "/productFromProductListPage",
  productCategoryFromProductListPage: apiAddress + "/productCategoryFromProductListPage",
  producerFromProductListPage: apiAddress + "/producerFromProductListPage"
}

exports.apiUrl = apiUrl