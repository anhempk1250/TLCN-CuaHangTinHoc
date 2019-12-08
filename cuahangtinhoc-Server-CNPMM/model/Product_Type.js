let mongooes = require('mongoose')
let schema = mongooes.Schema

let product_type = new schema({
  id: schema.Types.ObjectId,
  name: String,
  HomePage: Boolean,
  status: Boolean,
  product_list_with_type: [{ type: schema.Types.ObjectId, ref: 'product' }],
  category: { type: schema.Types.ObjectId, ref: 'product_category' }
}, { collection: 'product_type' },)




module.exports = mongooes.model('product_type', product_type)