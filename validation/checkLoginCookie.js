var Books = require('../models/book.model');
module.exports.checkLogin = async (req , res , next) => {
  // 1. get cookie , if not , redirect and return 
  
  // vì đã singed = true , nếu cookie thì chỉ ở mãi trang login
  // create a new hash string and put it after cookie ,if you change , brower will detect ( phát hiện)
  // if you try to change cookie , return {account : false } and move you to login page 
  console.log(req.cookies , req.signedCookies); 

  if(!req.signedCookies.account) {
    res.redirect('/login');
    return;
  }
  
  var User = await Books.find({'_id' : req.signedCookies.account});
  //console.log(User);
  
  // 2.check fake or real cookie, if it is fake , the same as above 
  if(!User) {
    res.redirect('login');
    return;
  }
  //console.log('user + ' +  User);
  // create a local variable and can use it in commom.pug 
  res.locals.User = User[0];
  next();
}