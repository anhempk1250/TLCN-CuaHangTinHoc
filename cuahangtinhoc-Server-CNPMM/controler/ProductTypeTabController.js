var ProductType = require('../model/Product_Type');
var Category = require('../model/Product_Category');
var Product = require('../model/Product');

exports.productTypeList = function (req, res) {
  ProductType.find().populate('product_list_with_type', null, { status: 1 }).populate('category').exec(function (err, list) {
    if (err) res.send({ msg: { msg: err } })
    else {
      res.send({ list: list })
    }
  })
}

exports.getStoreCategoryFromProductPage = function (req, res) {
  Category.find({ status: 1 }).exec(function (err, list) {
    if (err) res.send(err)
    else res.send({ list: list })
  })
}

exports.getStoreProductListFromProductTypePage = function (req, res) {
  Product.find({ status: 1 }).exec(function (err, list) {
    if (err) res.send(err)
    else res.send({ list: list })
  })
}