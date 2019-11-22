let mongooes = require('mongoose')
let schema = mongooes.Schema

let order_status = new schema({
  id: Number,
  status: String
}) 

module.exports = mongooes.model('order_status', order_status)