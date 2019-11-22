let mongooes = require('mongoose')
let schema = mongooes.Schema

let order = new schema({
  id: String,
  time: String,
  order_status_id: Number,
  total_Price: Number,
  employee_id: String
}, {collection: 'orders'}) 

module.exports = mongooes.model('order', order)