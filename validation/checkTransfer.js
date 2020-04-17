module.exports.checkValidate = (req, res, next ) => {
  // 1. check account
  var errors = [];
  if(!req.body.accountNumber) {
    errors.push("Account is empty !");
  }
  if(!req.body.amount) {
    errors.push("Please Enter the Amnout!")
  }
  if(errors.length) {
    res.render('transfer/hacker' , {
      "errors" : errors
    });
    return;
  }
  // 2. check money 
  next();
}