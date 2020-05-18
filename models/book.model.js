var mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
  name : String,
  author : String,
  email : String , 
  pass : String, 
  avatar : String
})

var Boooks = mongoose.model('Books' , bookSchema , 'books');
module.exports = Boooks;