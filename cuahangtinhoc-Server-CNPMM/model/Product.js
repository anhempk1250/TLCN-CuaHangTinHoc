let mongooes = require('mongoose')
let schema = mongooes.Schema

let product = new schema({
  id: String,
  name: String,
  price: Number,
  cost_price: Number,
  description: String,
  productCount: Number,
  producer: { type: schema.Types.ObjectId, ref: 'producer' },
  product_category_id: { type: schema.Types.ObjectId, ref: 'product_category' },
  product_type_list: [{ type: schema.Types.ObjectId, ref: 'product_product_type' }],
  images: [{ type: schema.Types.ObjectId, ref: 'image' }],
  employee_id: String,
  discount_id: Number,
  status: Number
}, { collection: 'product' })

module.exports = mongooes.model('product', product)