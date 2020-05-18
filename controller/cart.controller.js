var db = require('../db');
var Product = require('../models/products.model');
var Session = require('../models/cart.model');
var Books = require('../models/book.model')
module.exports.addToCart = async (req, res, next) => {

  var productId = req.params.productId;

  var pageCurrent = req.query.page;
  // current customer
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/products');
    return;
  }

  // check first
  var products = await Session.findById({ _id: sessionId });
  // console.log('test : ' + products);
  // console.log('test : ' + products.cart[0]);
  var count;
  // 0 
  var cartLength = products.cart.length;

  // count sai 
  if (products.cart[cartLength] == undefined) {
    count = 0;
  }
  console.log(count);
  console.log(typeof products.cart);
  // var count = products.cart[0].amount;

  if (cartLength == 0) {
    products.cart[0] = {
      name: productId,
      amount: count + 1
    }
    //products.save();
  } else {
    // length = 1; 
    var test = true;
    for (var i = 0; i < cartLength; i++) {
      if (products.cart[i].name == productId) {
        // count cua mat hang trung ten
        count = products.cart[i].amount;
        products.cart[i].amount = count + 1;
        //products.save();
        test = false;
        break;
      }
    }
    if (test == true) {
      products.cart[cartLength] = {
        name: productId,
        amount: 1
      }
    }
  }
  products.save();

  console.log('length ' + products.cart.length);

  res.redirect("/products?page=" + pageCurrent);
}


module.exports.viewAllCart = async (req, res, next) => {
  // session check old user
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect('/products');
    return;
  }
  
  // Ten dang nhap , Chú Cuội 
  var User = await Books.find({ _id: req.signedCookies.account });
  // set ten nguoi dung sau khi login 
  res.locals.User = User[0];
  
  var allProducts = await Product.find({}); 
  // check cart
  var products = await Session.findById({ _id: sessionId });

  // 1 . get all products in the Cart 
  var arrayProducts = products.cart; // ARRAY
  console.log('Length '  + products.cart.length);

  var idProducts = arrayProducts.map(ele => {
    return ele.name;
  });

  var amountEachProducts = arrayProducts.map(ele => {
    return ele.amount;
  }) // amout , array 

  // get price and name based on product's Id We have just found above
  

  var arrayName = [];
  var arrayPrice = [];
  for (var i = 0; i < idProducts.length; i++) {
    allProducts.filter(ele => {
      if (ele._id == idProducts[i]) {
        arrayName.push(ele.name);
        arrayPrice.push(ele.price);
      }
    })
  }

  console.log("Name : " + arrayName);
  console.log("Gia :  " + arrayPrice);
  console.log('So luong ' + amountEachProducts);
  var value = [];
  for(var i = 0 ; i < arrayName.length ; i++ ) {
    value[i] = {
      name : arrayName[i] ,
      price : arrayPrice[i] ,
      amount : amountEachProducts[i],
      money : arrayPrice[i] * amountEachProducts[i]
    }
  }
  res.render('products/viewCart', {
    "value" : value
  })
}
// try to complete (View all Cart).pug completely