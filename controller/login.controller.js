const md5 = require('md5');
var Book = require('../models/book.model');
module.exports.login = (req , res , next) => {
  // In the login page 
  // I try to check Is there any cookie from the 
  // previous session ? , if yes , delete it for 
  // mew login session
  if(req.signedCookies.account) {
    res.clearCookie('account')
  }
  res.render("login/login")
}
module.exports.postLogin = async (req , res, next) => {
  var email = req.body.email;
  var password = req.body.pass;
  var emailUser = await Book.find({'email' : email});
  console.log(emailUser) ;
  console.log(emailUser[0].name);
  if(!emailUser) {
    res.render('login/login', {
      'errors' : ['Account doesn\'t exist.']
    })
    return;
  }
  var hashedPassword = md5(password);
  //console.log(hashedPassword);

  if(emailUser[0].pass !== hashedPassword) {
    res.render('login/login', {
      'errors' : ['Wrong password.'], 
      'values' : req.body.email
    })
    return;
  }
  // set cookie to login : id of user
  
  res.cookie('account' , emailUser[0]._id , {
    signed: true // để có thể biến đổi signed cookie
  });

  res.redirect('/book');
}