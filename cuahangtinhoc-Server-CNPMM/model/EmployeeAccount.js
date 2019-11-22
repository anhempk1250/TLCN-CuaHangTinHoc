let mongooes = require('mongoose')
let schema = mongooes.Schema

let employeeaccount = new schema({
  password: String,
  name: String,
  sex: Boolean,
  phone: String,
  type: String
}, {collection: 'employeeaccount'}) 

module.exports = mongooes.model('employeeaccount', employeeaccount)