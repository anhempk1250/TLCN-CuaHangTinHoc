let mongooes = require('mongoose')
let schema = mongooes.Schema

let product_order = new schema({
  id_product : Number,
  id_order: Number,
  productCount: Number
}) 

module.exports = mongooes.model('product_order', product_order)