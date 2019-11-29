let mongooes = require('mongoose')
let schema = mongooes.Schema

let product_type = new schema({
  _id: schema.Types.ObjectId,
  id: schema.Types.ObjectId,
  name: String,
  HomePage: Boolean,
  status: Boolean,
  product_list_with_type: [{ type: schema.Types.ObjectId, ref: 'product' }]
}, { collection: 'product_type' },)




module.exports = mongooes.model('product_type', product_type)