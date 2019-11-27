var Order = require('../model/Order')
var OrderStatus = require('../model/Order_Status')

function findAndInserOrder(index, req, res) {
  myID = 'order_' + index
  Order.findOne({ id: myID }, function (err, order) {
    if (!err && order) {
      findAndInserOrder(index + 1, req, res);
    } else {
      let order = new Order(req.query);
      order.id = myID;
      order.save(function (err, order) {
        res.send(order);
      })
    }
  })
}

exports.insertOrder = function (req, res) {
  let order = new Order(req.query);
  Order.count(function (err, count) {
    let index = count;
    let myID = '';
    myID = findAndInserOrder(index, req, res);
  });
}

exports.getOrder = function(req,res) {
  Order.find(function(err,list){
    res.send({list: list})
  })
}