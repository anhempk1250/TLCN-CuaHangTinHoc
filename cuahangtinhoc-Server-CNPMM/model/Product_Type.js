let mongooes = require('mongoose')
let schema = mongooes.Schema

let product_type = new schema({
  _id: schema.Types.ObjectId,
  name: String,
  HomePage: String,
  list_product_with_type: [{ type: schema.Types.ObjectId, ref: 'list_product_with_type' }]
}, { collection: 'product_type' })




module.exports = mongooes.model('product_type', product_type)