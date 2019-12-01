let mongooes = require('mongoose')
let schema = mongooes.Schema

let order = new schema({
  time: String,
  order_status_id: { type: schema.Types.ObjectId, ref: 'order_status'},
  total_price: Number,
  employee: {type: schema.Types.ObjectId, ref: 'employeeaccount'},
  customer: { type: schema.Types.ObjectId, ref: 'customeraccount' },
  product_order: [{ type: schema.Types.ObjectId, ref: 'product_order' }],
  status: Boolean
}, {collection: 'orders'}) 

module.exports = mongooes.model('order', order)