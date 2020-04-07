const express = require('express');
const app = express();
const port = 3000;
var cookieParser = require('cookie-parser')
const pug = require('pug');
const db = require('./db')
var routerBook = require('./router/book.route')
var bodyParser = require('body-parser');
var routerLogin = require('./router/login.route');
var checkCookie = require('./validation/checkLoginCookie');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.set('view engine', 'pug')
app.set('views', './views');


app.get('/' , (req , res ) => {
  // có thể tách ra 1 file middleware nhưng ko thích ^^ 
  // nếu check có cookie hay không
  if(!req.cookies.account) {
    res.render("welcome" , {
      'url' : '/login'
    });
  }
  // check có cookie trùng với email của người dùng hay ko , tránh fake cookie thì vẫn nhận 
  var user = db.get('books').find({email : req.cookies.account }).value();
  if(!user) {
    res.render("welcome" , {
      'url' : '/login'
    });
  }
  // if not , move to /login ^^^^^^^^^^^^
  // nếu có thì move to /book 
  res.render("welcome" , {
    'url' : '/book'
  });
})

app.use('/book' , checkCookie.checkLogin ,routerBook);
app.use('/login' , routerLogin)

// use static file , css , images
app.use(express.static('public'));

app.listen(port , () => {
  console.log(`App listening on port ${port}`)
})