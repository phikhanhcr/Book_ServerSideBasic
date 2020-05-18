var db = require("../../db");
var Session = require('../../models/cart.model');
module.exports.getNumber = async function (req, res, next) {
  // check xem có phải là khách hàng cũ hay ko bằng sessionId
  // if that is old customer, giữ nguyên giỏ hàng 
  // if not , total cart = 0 
  var sessionId = req.signedCookies.sessionId;
  var totalCart = await Session.findById({_id : sessionId});
  //lấy số lượng sản phẩm , nếu ko check thì ra undefined ngứa mắt vcl
  if (totalCart == 0) {
    res.locals.totalCart = 0;
  } else {
    //console.log("Total cart : " + totalCart);
    res.locals.totalCart = totalCart.cart.length;
  }
  next();
}