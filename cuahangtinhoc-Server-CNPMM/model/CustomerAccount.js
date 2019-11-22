let mongooes = require('mongoose')
let schema = mongooes.Schema

let customerAccountSchema = new schema({
  email: String,
  passsword: String,
  name: String,
  sex: Boolean,
  Phone: String
},{collection: 'customeraccount'}) 

module.exports = mongooes.model('customeraccount', customerAccountSchema)