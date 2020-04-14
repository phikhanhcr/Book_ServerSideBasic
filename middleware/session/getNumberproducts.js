module.exports.getNumber = function(req, res, next) {
  var totalCart = req.signedCookies.totalCart ;
  res.locals.totalCart = totalCart;
  next();
}