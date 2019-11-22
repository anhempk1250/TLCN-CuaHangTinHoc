var jwt = require('jsonwebtoken')
var config = require('./config/config.json')
var secretKey = config.secretKey
var Employee = require('./model/EmployeeAccount');
exports.requireLogin = function (req, res, next) {
  jwt.verify(req.query.token, secretKey, function (err, employeeAccount) {
    if (err) res.send({ msg: err, errorToken: true }) // token không hợp hệ
    else {
      Employee.findOne({ id: employeeAccount.id }, function (err, employee) {
        if (err) res.send(err)
        else {
          if (!employee)
            res.send({ msg: 'Truy cập bị lỗi, dừng phiên đăng nhập2', errorToken: true }) // token không hợp hệ
          else {
            req.query.employee = employee._id;
            next();
          }
            
        }
      })
    }
  })
}