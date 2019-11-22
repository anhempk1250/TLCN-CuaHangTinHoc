let CustomerAccount = require('../model/CustomerAccount')
let Order = require('../model/Order')
let ProductOrder = require('../model/Product_Order')
let Product = require('../model/Product')

exports.getCustomerInfo = function (req, res) {
  CustomerAccount.findOne({ email: req.query.email }, function (err, CustomerAccount) {
    if (err) res.send({ msg: err })
    else if (CustomerAccount == null) {
      res.send('customer does not exist')
    }
    else {
      res.send(CustomerAccount)
    }
  })
}

exports.getListOders = function (req, res) {
  Order.find({ customer_id: req.query.customer_id }, function (err, Orders) {
    if (err) res.send({ msg: err })
    else if (Orders.length == 0) {
      res.send('customer have no bought history')
    }
    else {
      res.send(Orders)
    }
  })
}

exports.detailOrder = function (req, res) {
  Order.findOne({ _id: req.query._id }).populate({
    path: 'product_list_with_order',
    select: 'product , productCount -_id'
  }).exec(function (err, list) {
    if (err) res.send({ msg: err })
    else
      ProductOrder.populate(list, { path: 'product_list_with_order.product', model: 'product',  select: 'Name -_id'}, function (err, list2) {
        if (err) res.send({ msg: err })
        else
          res.send(list2)
      })
  });
}

exports.getListBoughtProduct = function (req, res) {
  Order.findOne({ _id: req.query._id }).populate({
    path: 'product_list_with_order',
    select: 'product -_id'
  }).exec(function (err, list) {
    if (err) res.send({ msg: err })
    else
      ProductOrder.populate(list, { path: 'product_list_with_order.product', model: 'product',  select: 'Name -_id'}, function (err, list2) {
        if (err) res.send({ msg: err })
        else
          res.send(list2.product_list_with_order)
      })
  });
}