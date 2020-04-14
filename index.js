// enviroment variable
require('dotenv').config();

const express = require('express');
const app = express();
const port = 3001;
var cookieParser = require('cookie-parser')
const pug = require('pug');
const db = require('./db')
var routerBook = require('./router/book.route')
var bodyParser = require('body-parser');
var routerLogin = require('./router/login.route');
var routerProducts = require('./router/products.route');
var checkCookie = require('./validation/checkLoginCookie');
var sessionMiddleware = require('./middleware/session/session.middleware');
var cartRoute = require('./router/cart.route')
var getNumberProducts = require('./middleware/session/getNumberproducts');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// use enviroment variable , save in .env 
app.use(cookieParser(process.env.SingedCookies));
app.set('view engine', 'pug')
app.set('views', './views');

app.use(sessionMiddleware);
app.get('/' , (req , res ) => {
  // có thể tách ra 1 file middleware nhưng ko thích ^^ 
  // nếu check có cookie hay không
  if(!req.signedCookies.account) {
    res.render("welcome" , {
      'url' : '/login'
    });
    return;
  }
  // check có cookie trùng với email của người dùng hay ko , tránh fake cookie thì vẫn nhận 
  var user = db.get('books').find({id : req.signedCookies.account }).value();
  if(!user) {
    res.render("welcome" , {
      'url' : '/login'
    });
    return;
  }
  // if not , move to /login ^^^^^^^^^^^^
  // nếu có thì move to /book 
  res.render("welcome" , {
    'url' : '/book'
  });
})

app.use('/products' , checkCookie.checkLogin, getNumberProducts.getNumber , routerProducts);
app.use('/book' , checkCookie.checkLogin ,routerBook);
app.use('/login' , routerLogin);

app.use('/cart' , cartRoute);

// use static file , css , images
app.use(express.static('public'));

app.listen(port , () => {
  console.log(`App listening on port ${port}`)
})