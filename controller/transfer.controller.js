var shortId = require('shortid');
var db = require("../db");
module.exports.create = (req, res, next) => {
  res.render('transfer/hacker' , { 
    "csrfToken" : req.csrfToken()
  });
}
module.exports.createTransfer = (req, res, next) => {
  var data = {
    id : shortId.generate() , 
    userId : req.signedCookies.account,
    amount : parseInt(req.body.amount),
    accountId : req.body.accountNumber
  }
  db.get('transfer').push(data).write();
  res.redirect('/transfer');
}