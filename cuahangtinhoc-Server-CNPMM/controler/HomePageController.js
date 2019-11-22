let Product = require('../model/Product');
let ListProductWithType = require('../model/List_Product_With_Type')
let Product_Type = require("../model/Product_Type");
let Category = require("../model/Product_Category")
let mongoose = require('mongoose');
exports.productList = function (req, res) {

  Product.find(function(err,list){
    if(err) res.send(err);
    else {
      res.json(list)
    }
  })

  /**Product_Type.find({ HomePage: '1' }, function (err, typeList) {
    if(err) res.send(err)
    let temp = [];
    let count = typeList.length;
    typeList.forEach(function (type) {
      ListProductWithType.find({ product_type_id: type._id }, function (err, productList) {
        if(err) res.send(err)
        temp.push(productList)
        count -= 1;
        if (count == 0) {
          res.json(temp)
        }
      })
    })

  }) */

}

exports.product = function(req,res) {
  Product.findOne({id: req.query.id}, function(err, product){
    if(err) res.send({msg: err})
    else {
      res.send(product);
    }
  })
}

exports.productCategoryList = function(req, res) {
  Category.find({active: true},function(err,list){
    if(!err && list) {
      res.json(list)
    }
  })
}