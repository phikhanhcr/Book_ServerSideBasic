var db = require('../db')
module.exports.checkLogin = (req , res , next) => {
  // 1. get cookie , if not , redirect and return 
  
  // vì đã singed = true , nếu cookie thì chỉ ở mãi trang login
  // create a new hash string and put it after cookie ,if you change , brower will detect ( phát hiện)
  // if you try to change cookie , return {account : false } and move you to login page 
  console.log(req.cookies , req.signedCookies); 

  if(!req.signedCookies.account) {
    res.redirect('/login');
    return;
  }
  
  var user = db.get('books').find({id : req.signedCookies.account}).value();
  //console.log(user);
  
  // 2.check fake or real cookie, if it is fake , the same as above 
  if(!user) {
    res.redirect('login');
    return;
  }
  
  // create a local variable and can use it in commom.pug 
  res.locals.user = user;
  next();
}