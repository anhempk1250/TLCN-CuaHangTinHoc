let mongooes = require('mongoose')
let schema = mongooes.Schema

let customerAccountSchema = new schema({
  id: String,
  passsword: String,
  name: String,
  sex: Boolean,
  Phone: String
}) 

module.exports = mongooes.model('customerAccount', customerAccountSchema)