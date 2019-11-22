let mongooes = require('mongoose')
let schema = mongooes.Schema

let order = new schema({
  time: String,
  order_status_id: Number,
  total_Price: Number,
  employee_id: { type: schema.Types.ObjectId, ref: 'employeeaccount' },
  customer_id: { type: schema.Types.ObjectId, ref: 'customeraccount' },
  product_list_with_order: [{ type: schema.Types.ObjectId, ref: 'product_order' }]
}, {collection: 'orders'}) 

module.exports = mongooes.model('order', order)