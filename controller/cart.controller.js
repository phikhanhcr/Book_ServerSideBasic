var db = require('../db');
module.exports.addToCart = (req, res, next) => {
  var productId = req.params.productId;
  var pageCurrent = req.query.page;
  console.log("current page: " + req.query.page);
  var sessionId = req.signedCookies.sessionId;
  console.log("haiahsi" + productId);
  if (!sessionId) {
    res.redirect('/products');
    return;
  }
  // set count value , default = 0 
  var count = db.get("sessions")
                .find({ id: sessionId })
                .get('cart.' + productId, 0)
                .value();
  // get id user , and set product into user's cart
  db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + productId, count + 1)
    .write();
  // get number of products you wanna buy( count số sản phẩm , trùng thì thôi)
  var totalCart = db.get('sessions')
                    .find({ id: sessionId })
                    .get('cart')
                    .size()
                    .value()

  res.cookie('totalCart', totalCart, {
    signed: true
  });

  // sum of the number each product , (tổng cả cả bao nhiêu)
  var totalNumberCart = Object.values(db.get('sessions')
                                        .find({ id: sessionId })
                                        .get('cart')
                                        .value()
                                        ).reduce((a, b) => {
                                          return a + b;
                                        }, 0)
  console.log(" array: " + totalNumberCart)
  console.log(" Keys: " + Object.keys(db.get('sessions')
                                        .find({ id: sessionId })
                                        .get('cart')
                                        .value()
                                        )
  )

  // get the key of each products and you can get its name from it
  var arrayKeysId = Object.keys(db.get('sessions')
                                  .find({ id: sessionId })
                                  .get('cart')
                                  .value()
                                  )
  
  // get the name of each product
  var nameOfProducts = [];
  arrayKeysId.forEach(ele => {
    nameOfProducts.push(db.get('products')
                          .find({ id: ele })
                          .get('name')
                          .value())
  })
  console.log(nameOfProducts);

  //console.log("totalCart: " + totalCart);

  res.redirect("/products?page=" + pageCurrent);
}