let mongooes = require('mongoose')
let schema = mongooes.Schema

let order = new schema({
  id: schema.Types.ObjectId,
  time: String,
  status: { type: schema.Types.ObjectId, ref: 'order_status'},
  total_price: Number,
  address: String,
  note: String,
  employee: {type: schema.Types.ObjectId, ref: 'employeeaccount'},
  customer: { type: schema.Types.ObjectId, ref: 'customeraccount' },
  product_list: [{ type: schema.Types.ObjectId, ref: 'product' }],
  ProductCount: Array
}, {collection: 'orders'}) 

module.exports = mongooes.model('order', order)