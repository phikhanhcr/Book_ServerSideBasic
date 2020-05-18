var bodyParser = require('body-parser');
var multer  = require('multer');
var removeAccents = require('../removeAccents')
const shortid = require('shortid');
var Book = require('../models/book.model');

module.exports.home = async (req, res) => {
  //console.log(req.cookies);
  var books = await Book.find();
  res.render('book', {
    'books': books,
    "totalCart" : ""
  })
}

module.exports.create = (req, res) => {
  res.render('create');
}

module.exports.createPost = async (req, res) => {
  var name = req.body.name;
  var author = req.body.author;
  //req.body.avatar = req.file.path;
  console.log(req.file);
  var newBook = {
    name: name,
    author: author,
    avatar : '/' + req.file.path.split('\\').slice(1).join('/')
  }
  // add a new record
  await Book.insertMany(newBook);
  res.redirect('/book');
}

module.exports.search = async (req, res) => {
  var search = req.query.name;
  // Xóa dấu tiếng việt 
  var searchUnicode = removeAccents(search);
  //console.log(searchUnicode);
  var Books = await Book.find();
  var bookSearch = Books.filter(ele => {
    return removeAccents(ele.name).toLowerCase().indexOf(searchUnicode.toLowerCase()) !== -1;
  });
  console.log(bookSearch);
  res.render("book", {
    'books': bookSearch
  })
}

module.exports.findId = async (req, res) => {
  var id = req.params.id;
  var randomIndex = Math.floor(Math.random() * 7 + 1);
  console.log(id);
  var book = await Book.find({'_id' : id});
  var url = book[0].avatar;
  res.render('viewOne', {
    'book': book[0], 
    'url': url
  });
} 