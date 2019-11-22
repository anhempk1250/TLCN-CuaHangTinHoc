let mongooes = require('mongoose')
let schema = mongooes.Schema

let employeeaccount = new schema({
  id: String,
  password: String,
  name: String,
  sex: Boolean,
  Phone: String,
  IdentityCard: String,
  ID_Type_Of_Employee: String
}, {collection: 'employeeaccount'}) 

module.exports = mongooes.model('employeeaccount', employeeaccount)