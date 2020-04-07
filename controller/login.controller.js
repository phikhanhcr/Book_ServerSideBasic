const db = require('../db');
module.exports.login = (req , res , next) => {
  if(req.cookies.account) {
    res.clearCookie('account')
  }
  res.render("login/login")
}
module.exports.postLogin = (req , res, next) => {
  var email = req.body.email;
  var password = req.body.pass;
  var emailUser = db.get('books').find({email : email}).value();
  if(!emailUser) {
    res.render('login/login', {
      'errors' : ['Account doesn\'t exist.']
    })
    return;
  }
  if(password !== emailUser.pass) {
    res.render('login/login', {
      'errors' : ['Wrong password.'], 
      'values' : req.body
    })
    return;
  }
  res.cookie('account' , emailUser.email);
  res.redirect('/book');
}