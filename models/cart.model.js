var mongoose = require('mongoose');
var cartSchema = new mongoose.Schema({
  _id: { type: String },
  cart: [{
    name: { type: String, trim: true , default : ''},
    amount: { type: Number, default: 0 }
  }]
})
var Session = mongoose.model('Session', cartSchema, 'sessions');
module.exports = Session;