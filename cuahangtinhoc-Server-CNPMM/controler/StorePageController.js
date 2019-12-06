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

exports.getOrder = function (req, res) {
  OrderTabController.getOrder(req, res)
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