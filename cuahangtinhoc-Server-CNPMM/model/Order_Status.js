let mongooes = require('mongoose')
let schema = mongooes.Schema

let order_status = new schema({
  _id: schema.Types.ObjectId,
  name: String
}, {collection: 'order_status'}) 

module.exports = mongooes.model('order_status', order_status)