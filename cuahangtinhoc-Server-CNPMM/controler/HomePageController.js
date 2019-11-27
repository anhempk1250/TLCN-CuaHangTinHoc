let Product = require('../model/Product');
let ListProductWithType = require('../model/List_Product_With_Type')
let Product_Type = require("../model/Product_Type");
let Producer = require('../model/Producer');
let Image = require('../model/Image');
let Category = require("../model/Product_Category")
let db = require('mongoose').connection;


exports.productCategoryList = function (req, res) {
  Category.find({ status: 1}, function (err, list) {
    if (!err && list) {
      res.json(list)
    }
  })
}

exports.producerList = function (req, res) {
  Producer.find({ status: true }, function (err, list) {
    if (!err && list) {
      res.json(list)
    }
  })
}


exports.productTypeList = function (req, res) {
    Product_Type.find({status: 1, HomePage: true}).populate({
      path: 'product_list_with_type'
    }).exec(function(err,list){
      Product.populate(list,{path: 'product_list_with_type.images', model:'image'}, function(err, list2) {
        res.json({list: list2})
      })
    })
}