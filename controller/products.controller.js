const md5 = require('md5');
var removeAccents = require("../removeAccents");
var Product = require("../models/products.model"); 
var pagination = require('../pagenation');

module.exports.product = async (req, res, next) => {
  // var totalCart = req.signedCookies.totalCart;
  // console.log("what is this ? " + totalCart);
  
  //Pagination 
  var randomIndex = Math.floor(Math.random() * 9);
  var url = `/images/${randomIndex}.jpg`;
  //phan trang , 8 products per page 
  var page = req.query.page || 1;
  var perPage = 8;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  
  
  // // // page display 
  var pageCurrent = req.query.page ? req.query.page : 1;

  // var numberFixed = parseInt(pageCurrent);
  // var newArray = {};
  // if (pageCurrent == 1 || pageCurrent == 4 || pageCurrent == 7 || pageCurrent == 10) {
  //   newArray = {
  //     first: numberFixed,
  //     second: numberFixed + 1,
  //     third: numberFixed + 2
  //   }
  // } else if (pageCurrent == 2 || pageCurrent == 5 || pageCurrent == 8 || pageCurrent == 11) {
  //   newArray = {
  //     first: numberFixed - 1,
  //     second: numberFixed,
  //     third: numberFixed + 1
  //   }
  // } else if (pageCurrent == 3 || pageCurrent == 6 || pageCurrent == 9 || pageCurrent == 12) {
  //   newArray = {
  //     first: numberFixed - 2,
  //     second: numberFixed - 1,
  //     third: numberFixed
  //   }
  // } else if (pageCurrent == 13) {
  //   //console.log(pageCurrent);
  //   newArray = {
  //     first: pageCurrent,
  //     second: "",
  //     third: ""
  //   }
  // }
  
  //console.log(newArray); // để test cái biến local ở middleware 
  //console.log("Local lam gi o day nhi ? " + res.locals.totalCart);
  var listPagination = pagination(pageCurrent , 10)
  var product = await Product.find();
  res.render('products/product' ,  {
    'products' : product.slice(start , end), 
    'pageCurrent' : pageCurrent, 
    'fixed1' : listPagination[0] ,
    'fixed2' :  listPagination[1] ,
    'fixed3' : listPagination[2] 
  })
}


module.exports.searchProduct = async (req, res, next) => {
  var seachInput = req.query.name;
  var removeAccentsInput = removeAccents(seachInput).toLowerCase();
  var products = await Product.find();
  var productsSearch = products.filter(ele => {
    return removeAccents(ele.name).toLowerCase().indexOf(removeAccentsInput) !== -1;
  });
  var nothing = productsSearch.length > 0 ? "" : "No item matched";
  var page = req.query.page || 1;
  var perPage = 8;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  res.render('products/product', {
    'products': productsSearch.slice(start, end),
    'nothing': nothing
  })
}

module.exports.viewProduct = async (req, res, next) => {
  var getBackPage = req.query.page;
  var id = req.params.id;
  var product = await Product.find({ _id : id})
  res.render('products/viewOne', {
    'product': product,
    'pageCurrent': getBackPage
  });
}



// mission tomorrow
// 1. Phân trang 13 
// view a product and press get back , move to page current 