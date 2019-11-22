let Product = require('../model/Product');
let ProductType = require("../model/Product_Type");

exports.productList = function (req, res) {
  Product.find().populate('product_category_id').exec(function (err, productList) {
    if (err) res.send({ msg: err })
    else {
      res.json({ list: productList });
    }
  })
}

exports.productTypeList = function (req, res) {
  ProductType.find().populate('product_category_id').exec(function (err, list) {
    if (err) res.send({msg: { msg: err }})
    else {
      res.send({list: list})
    }
  })
}