let mongooes = require('mongoose')
let schema = mongooes.Schema

let producer = new schema({
  id : Number,
  name: String
}) 

module.exports = mongooes.model('producer', producer)