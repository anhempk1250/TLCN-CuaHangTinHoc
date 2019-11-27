let mongoose = require('mongoose')
let schema = mongoose.Schema;

let customeraccount = new schema({
  id: String,
  email: String,
  name: String,
  password: String,
  sex: Boolean
}, {collection: 'customeraccount'})

module.exports = mongoose.model('customeraccount',customeraccount);