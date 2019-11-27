let mongooes = require('mongoose')
let schema = mongooes.Schema

let product_category = new schema({
  id: Number,
  name: String,
  property: String,
  employee: { type: schema.Types.ObjectId, ref: 'employeeaccount' },
  products: [{ type: schema.Types.ObjectId, ref: 'product' }],
  summaryName: String,
  status: Number
}, { collection: 'product_category' })

module.exports = mongooes.model('product_category', product_category)