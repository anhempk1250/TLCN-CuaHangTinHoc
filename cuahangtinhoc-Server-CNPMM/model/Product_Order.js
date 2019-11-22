let mongooes = require('mongoose')
let schema = mongooes.Schema

let product_order = new schema({
  product : { type: schema.Types.ObjectId, ref: 'product' },
  order:{ type: schema.Types.ObjectId, ref: 'order' },
  productCount: Number
}, {collection: 'product_order'}) 

module.exports = mongooes.model('product_order', product_order)