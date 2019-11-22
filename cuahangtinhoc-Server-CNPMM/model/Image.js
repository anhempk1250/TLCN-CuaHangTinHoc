let mongooes = require('mongoose')
let schema = mongooes.Schema

let image = new schema({
  product_id: {type: schema.Types.ObjectId, ref: 'product'},
  image_link : String,
}, { collection: 'image' })

module.exports = mongooes.model('image', image)