var Order = require('../model/Order')
var OrderStatus = require('../model/Order_Status')
var Customer = require('../model/CustomerAccount')


exports.insertOrder = function (req, res) {
   let newOrder = new Order(req.query)
   var today = new Date();
   newOrder.time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   newOrder.order_status_id = '5de076402373de2fc465aa25';
   newOrder.status = 1;
   newOrder.order_product = req.query.product_order.split("___");
   newOrder.save(function(err, order) {
     if(!err)
      res.json({msg: 'Thêm thành công', RequestSuccess: true})
   })
}

exports.getOrder = function(req,res) {
  Order.find({status: true}).populate('employee').populate('customer').populate('product_order').populate('order_status_id').exec(function(err,list){
    if(!err) res.json({list: list})
  })
}


exports.getCustomerList = function(req,res) {
  Customer.find(function(err, list){
    res.json({list: list})
  })
}