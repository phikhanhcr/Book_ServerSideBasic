var bodyParser = require('body-parser');
var multer  = require('multer');
var removeAccents = require('../removeAccents')
const db = require('../db');
const shortid = require('shortid');

module.exports.home = (req, res) => {
  console.log(req.cookies);

  res.render('book', {
    'books': db.get('books').value(), 
    "totalCart" : ""
  })
}

module.exports.create = (req, res) => {
  res.render('create');
}

module.exports.createPost = (req, res) => {

  var name = req.body.name;
  var author = req.body.author;
  var id = shortid.generate();
  //req.body.avatar = req.file.path;
  console.log(req.file);
  var newBook = {
    name: name,
    author: author,
    id: id, 
    avatar : '/' + req.file.path.split('\\').slice(1).join('/')
  }
  db.get('books').push(newBook).write();
  res.redirect('/book')
}

module.exports.search = (req, res) => {
  var search = req.query.name;
  // Xóa dấu tiếng việt 
  var searchUnicode = removeAccents(search);
  console.log(searchUnicode);
  var bookSearch = db.get('books').value().filter(ele => {
    return removeAccents(ele.name).toLowerCase().indexOf(searchUnicode.toLowerCase()) !== -1;
  });
  console.log(bookSearch);
  res.render("book", {
    'books': bookSearch
  })
}
module.exports.findId = (req, res) => {
  var id = req.params.id;
  var randomIndex = Math.floor(Math.random() * 7 + 1)
  var url = `/images/${randomIndex}.jpg`;
  console.log(id);
  res.render('viewOne', {
    'book': db.get('books').find({ id: id }).value(),
    'url': url
  });
} 