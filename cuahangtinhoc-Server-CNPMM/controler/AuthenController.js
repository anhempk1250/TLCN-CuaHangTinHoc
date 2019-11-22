var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var config = require('../config/config.json')
var secretKey = config.secretKey
var Employee = require('../model/EmployeeAccount')

exports.storeLogin = function login(req, res) {
  Employee.findOne({ id: req.query.id }, function (err, employee) {
    if (err) res.send(err)
    if (!employee || employee == {} || employee.password != req.query.password)
      res.send({ msg: 'Tài khoản hoặc mật khẩu sai' })
    else
      return res.json({ 
        token: jwt.sign({ id: employee.id, name: employee.name, _id: employee._id }, secretKey)
      });
  })
}


