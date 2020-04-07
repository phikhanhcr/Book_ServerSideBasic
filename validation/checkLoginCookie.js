var db = require('../db')
module.exports.checkLogin = (req , res , next) => {
  // get cookie , if not , redirect and return 
  if(!req.cookies.account) {
    res.redirect('/login');
    return;
  }
  var user = db.get('books').find({email : req.cookies.account}).value();
  // check fake or real cookie, if it is fake , the same as above 
  if(!user) {
    res.redirect('login');
    return;
  }
  next();
}