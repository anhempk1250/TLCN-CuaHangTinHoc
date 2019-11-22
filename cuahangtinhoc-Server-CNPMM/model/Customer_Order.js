let mongooes = require('mongoose')
let schema = mongooes.Schema

let customer_order = new schema({
  id_customer: String,
  id_order: Number
}) 

module.exports = mongooes.model('customer_order', customer_order)