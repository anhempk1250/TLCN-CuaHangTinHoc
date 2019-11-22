var CategoryTabController = require('./CategoryTabController');
var AuthenController = require('./AuthenController');
var OrderTabController = require('./OrderTabController')
var ProductTabController = require('./ProductTabController')
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

// store product
exports.productList = function (req, res) {
  ProductTabController.productList(req, res)
}

// store product type

exports.productTypeList = function(req,res) {
  ProductTabController.productTypeList(req,res)
}