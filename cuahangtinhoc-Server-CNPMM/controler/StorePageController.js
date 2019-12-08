var CategoryTabController = require('./CategoryTabController');
var AuthenController = require('./AuthenController');
var OrderTabController = require('./OrderTabController')
var ProductTabController = require('./ProductTabController')
var ProductTypeTabController = require('./ProductTypeTabController')
//store category
exports.categoryList = function (req, res) {
  CategoryTabController.categoryList(req, res);
}
exports.insertCategory = function (req, res) {
  CategoryTabController.insertCategory(req, res);
}

exports.updateCategory = function (req, res) {
  CategoryTabController.updateCategory(req, res)
}

exports.deleteCategory = function (req, res) {
  CategoryTabController.deleteStoreCategory(req, res)
}

// store auth
exports.storeLogin = function (req, res) {
  AuthenController.storeLogin(req, res);
}

// store order
exports.insertOrder = function (req, res) {
  OrderTabController.insertOrder(req, res)
}

exports.confirmOrder = function (req, res) {
  OrderTabController.confirmOrder(req, res)
}

exports.cancelOrder = function(req,res) {
  OrderTabController.cancelOrder(req,res)
}

exports.getOrder = function (req, res) {
  OrderTabController.getOrder(req, res)
}

exports.getOrderStatusList = function (req, res) {
  OrderTabController.getOrderStatusList(req, res)
}

exports.getCustomerList = function (req, res) {
  OrderTabController.getCustomerList(req, res)
}



// store product
exports.productList = function (req, res) {
  ProductTabController.productList(req, res)
}

exports.insertProduct = function (req, res) {
  ProductTabController.insertProduct(req, res)
}

exports.updateProduct = function (req, res) {
  ProductTabController.updateProduct(req, res)
}

exports.deleteProduct = function (req, res) {
  ProductTabController.deleteProduct(req, res)
}

exports.loadProducer = function (req, res) {
  ProductTabController.loadProducer(req, res)
}

exports.loadCategory = function (req, res) {
  ProductTabController.loadCategory(req, res)
}

// store product type

exports.productTypeList = function (req, res) {
  ProductTypeTabController.productTypeList(req, res)
}


exports.getStoreProductListFromProductTypePage = function (req, res) {
  ProductTypeTabController.getStoreProductListFromProductTypePage(req, res)
}
exports.insertProductType = function (req, res) {
  ProductTypeTabController.insertProductType(req, res);
}
exports.updateProductType = function (req, res) {
  ProductTypeTabController.updateProductType(req, res)
}

exports.deleteProductType = function (req, res) {
  ProductTypeTabController.deleteProductType(req, res)
}

exports.addProductToType = function (req, res) {
  ProductTypeTabController.addProductToType(req, res)
}

exports.deleteProductType = function (req, res) {
  ProductTypeTabController.deleteProductType(req, res)
}


