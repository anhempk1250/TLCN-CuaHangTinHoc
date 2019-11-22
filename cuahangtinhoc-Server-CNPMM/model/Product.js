let mongooes = require('mongoose')
let schema = mongooes.Schema

let product = new schema({
  Name: String,
  Price: Number,
  Description: String,
  producer_id: Number,
  product_category_id : {type: schema.Types.ObjectId, ref: 'product_category'},
  employee_id: String,
  discount_id: Number
}, { collection: 'product' })

module.exports = mongooes.model('product', product)