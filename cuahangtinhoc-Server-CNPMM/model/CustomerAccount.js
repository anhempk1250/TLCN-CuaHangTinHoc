let mongoose = require('mongoose')
let schema = mongoose.Schema;

let customeraccount = new schema({
  id: String,
  email: String,
  name: String,
  password: String,
  address: String,
  phone: String
}, {collection: 'customeraccount'})

module.exports = mongoose.model('customeraccount',customeraccount);