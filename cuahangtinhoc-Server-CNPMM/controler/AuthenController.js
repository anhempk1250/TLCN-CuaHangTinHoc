var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var config = require('../config/config.json')
var secretKey = config.secretKey
var Employee = require('../model/EmployeeAccount')
var Customer = require('../model/CustomerAccount');

exports.storeLogin = function login(req, res) {
  Employee.findOne({ id: req.query.id }, function (err, employee) {
    if (err) res.send(err)
    if (!employee || employee == {} || employee.password != req.query.password)
      res.send({msg: { title: 'Thông báo', msg: 'Tài khoản hoặc mật khẩu sai' }})
    else
      return res.json({ 
        token: jwt.sign({ id: employee.id, name: employee.name, _id: employee._id }, secretKey)
      });
  })
}

exports.customerLogin = function login(req, res) {
  if(!req.query.createFacebook) {
    Customer.findOne({ id: req.query.id }, function (err, customer) {
      if (err) res.send(err)
      if (!customer || customer == {} || customer.password != req.query.password)
        res.send({ title: 'Thông báo', msg: 'Tài khoản hoặc mật khẩu sai' })
      else
        return res.json({ 
          token: jwt.sign({ id: customer.id, name: customer.name, _id: customer._id }, secretKey)
        });
    })
  } else {
    let cus = new Customer();
    cus.id = req.query.id;
    cus.name = req.query.name;
    cus.facebook = true;
    cus.save(function(err,cus){
      res.json({
        token: jwt.sign({ id: customer.id, name: customer.name, _id: customer._id }, secretKey)
      })
    })
  }
}
