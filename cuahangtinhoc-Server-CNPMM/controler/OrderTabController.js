var Order = require('../model/Order')
var OrderStatus = require('../model/Order_Status')
var Customer = require('../model/CustomerAccount')
var Product = require('../model/Product')

exports.insertOrder = function (req, res) {
  let newOrder = new Order(req.query)
  var today = new Date();
  newOrder.id = newOrder._id;
  newOrder.time = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  newOrder.total_price = req.query.total_price;
  newOrder.customer = req.query.customer_object_id;
  newOrder.note = req.query.note;
  newOrder.status = '5de076402373de2fc465aa25';
  let temp = JSON.parse(req.query.productList);
  newOrder.product_list = [];
  newOrder.ProductCount = [];
  for (let i = 0; i < temp.length; i++) {
    newOrder.product_list.push(temp[i]._id);
    newOrder.ProductCount.push(temp[i].productCount)
  }
  newOrder.save(function (err, order) {
    if (!err)
      res.json({ msg: 'Thêm thành công', RequestSuccess: true })
  })
}

exports.confirmOrder = function (req, res) {
  Order.findOne({ _id: req.query._id }, function (err, order) {
    if (!err && order) {
      order.status = '5de076402373de2fc465aa25';
      order.employee = req.query.employee
      let productList = JSON.parse(req.query.productList);
      var count = productList.length;
      var temp = {};
      for (let i = 0; i < productList.length; i++) {
        let flag = false;
        Product.findOne({ id: productList[i].id }, function (err, product) {
          if (!err && product) {
            if (product.productCount > order.ProductCount[i]) {
              temp = product;
              flag = true;
              count--;
              if (count == 0) {
                order.save(function (err, or) {
                  if (err) res.json({ 'msg': err, 'RequestSuccess': false })
                  else res.json({ 'msg': 'Xác nhận đơn hàng thành công', 'RequestSuccess': true })
                })
              } else {
                res.json({ 'msg': 'Sản phẩm '+count+' không đủ số lượng', 'RequestSuccess': false })
              }
              console.log('i:',i,'count:',count,product.productCount,order.ProductCount[i]);
            } else {
              console.log('false i:',i)
            }
          }
        })
        if(flag==true) {
          break;
        }
      }
    } else {
      res.json({ 'msg': 'Lỗi', 'RequestSuccess': false })
    }
  })
}

exports.cancelOrder = function (req, res) {
  Order.findOne({ _id: req.query._id }, function (err, order) {
    if (!err && order) {
      order.status = '5de0764f2373de2fc465aa26';
      order.note = req.query.note;
      order.employee = req.query.employee
      order.save(function (err, or) {
        if (err) res.json({ 'msg': err, 'RequestSuccess': false })
        else res.json({ 'msg': 'Hủy đơn hàng thành công', 'RequestSuccess': true })
      })

    } else {
      res.json({ 'msg': 'Lỗi', 'RequestSuccess': false })
    }
  })
}

exports.getOrder = function (req, res) {
  Order.find()
    .populate('employee')
    .populate('customer')
    .populate('product_list')
    .populate('status')
    .exec(function (err, list) {
      list.ahihi = 'ahihi';
      if (!err) res.json({ list: list })
    })
}


exports.getCustomerList = function (req, res) {
  Customer.find(function (err, list) {
    res.json({ list: list })
  })
}

exports.getOrderStatusList = function (req, res) {
  OrderStatus.find(function (err, list) {
    if (!err) res.json({ 'list': list })
  })
}