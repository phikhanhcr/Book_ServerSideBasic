var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
  name : String,
  description : String,
  price : Number
})

var Products = mongoose.model('Products' , productSchema , 'products');
module.exports =  Products;