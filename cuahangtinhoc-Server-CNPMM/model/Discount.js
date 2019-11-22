let mongooes = require('mongoose')
let schema = mongooes.Schema

let discount = new schema({
  id : Number,
  name: String,
  rules: String,
  discountPercent: Number
}) 

module.exports = mongooes.model('discount', discount)