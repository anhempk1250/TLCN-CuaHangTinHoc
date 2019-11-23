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
      ProductOrder.populate(list, { path: 'product_list_with_order.product', model: 'product', select: 'Name -_id' }, function (err, list2) {
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
      ProductOrder.populate(list, { path: 'product_list_with_order.product', model: 'product', select: 'Name -_id' }, function (err, list2) {
        if (err) res.send({ msg: err })
        else
          res.send(list2.product_list_with_order)
      })
  });
}

exports.changePassword = function (req, res) {
  CustomerAccount.findOne({ _id: req.query._id }, function (err, customer) {
    if (err) res.send(err)
    else if (!customer) {
      res.json({ msg: { msg: 'tài khoản không tồn tại', RequestSuccess: false } })
    }
    else if (req.query.oldpass != customer.passsword) {
      res.json({ msg: { msg: 'sai mật khẩu', RequestSuccess: false } })
    }
    else if (req.query.newpass1 != req.query.newpass2) {
      res.json({ msg: { msg: 'nhập lại mật khẩu không trùng khớp', RequestSuccess: false } })
    }
    else if (!req.query.newpass1 ){
      res.json({ msg: { msg: 'vui lòng nhập mật khẩu mới', RequestSuccess: false } })
    }
    else {
      customer.passsword = req.query.newpass1
      customer.save()
      res.json({ msg: { msg: 'success', RequestSuccess: true } })
    }
  })
}