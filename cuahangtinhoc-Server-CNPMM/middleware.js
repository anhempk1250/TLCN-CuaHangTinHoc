var jwt = require('jsonwebtoken')
var config = require('./config/config.json')
var secretKey = config.secretKey
var Employee = require('./model/EmployeeAccount');
var Customer = require('./model/CustomerAccount')
exports.requireLogin = function (req, res, next) {
    let token = req.query.token;
    jwt.verify(token, secretKey, function (err, employeeAccount) {
    if (err) res.send({ msg: req.body.id, errorToken: true }) // token không hợp hệ
    else {
      Employee.findOne({ id: employeeAccount.id }, function (err, employee) {
        if (err) res.send(err)
        else {
          if (!employee)
            res.send({ msg: 'Truy cập bị lỗi, dừng phiên đăng nhập', errorToken: true }) // token không hợp hệ
          else {
            req.query.employee = employee._id;
            next();
          }
        }
      })
    }
  })
}


exports.requireLoginCustomer = function (req, res, next) {
  jwt.verify(req.query.token, secretKey, function (err, customerAccount) {
   if (err) res.send({ msg: 'Truy cập bị lỗi, dừng phiên đăng nhập1 ', errorToken: true }) // token không hợp hệ
   else {
    Customer.findOne({ _id: customerAccount._id }, function (err, customer) {
       if (err) res.send(err)
       else {
         if (!customer)
           res.send({ msg: 'Truy cập bị lỗi, dừng phiên đăng nhập2', errorToken: true }) // token không hợp hệ
         else {
           req.query.token = jwt.sign({ id: customer.id, name: customer.name, _id: customer._id }, secretKey)
           req.query.customer = customer;
           next();
         }
       }
     })
   }
 })
}
