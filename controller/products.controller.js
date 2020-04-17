const md5 = require('md5');
var removeAccents = require("../removeAccents");
const db = require('../db');

module.exports.product = (req, res, next) => {
  //var totalCart = req.signedCookies.totalCart;
  // var randomIndex = Math.floor(Math.random() * 9);
  // var url = `/images/${randomIndex}.jpg`;
  // phan trang , 8 products per page 
  var page = req.query.page || 1;
  var perPage = 8;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  
  
  // page display 
  var pageCurrent = req.query.page ? req.query.page : 1;

  var numberFixed = parseInt(pageCurrent);
  var newArray = {};
  if (pageCurrent == 1 || pageCurrent == 4 || pageCurrent == 7 || pageCurrent == 10) {
    newArray = {
      first: numberFixed,
      second: numberFixed + 1,
      third: numberFixed + 2
    }
  } else if (pageCurrent == 2 || pageCurrent == 5 || pageCurrent == 8 || pageCurrent == 11) {
    newArray = {
      first: numberFixed - 1,
      second: numberFixed,
      third: numberFixed + 1
    }
  } else if (pageCurrent == 3 || pageCurrent == 6 || pageCurrent == 9 || pageCurrent == 12) {
    newArray = {
      first: numberFixed - 2,
      second: numberFixed - 1,
      third: numberFixed
    }
  } else if (pageCurrent == 13) {
    console.log(pageCurrent);
    newArray = {
      first: pageCurrent,
      second: "",
      third: ""
    }
  }
  //console.log(newArray);
  console.log(res.locals.totalCart);
  res.render('products/product', {
    'products': db.get('products').value().slice(start, end),
    'fixed1': newArray.first,
    'fixed2': newArray.second,
    'fixed3': newArray.third,
    'pageCurrent': pageCurrent,
    "totalCart" : res.locals.totalCart
  })
}


module.exports.searchProduct = (req, res, next) => {
  var seachInput = req.query.name;
  var removeAccentsInput = removeAccents(seachInput).toLowerCase();
  var productsSearch = db.get('products').value().filter(ele => {
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

module.exports.viewProduct = (req, res, next) => {
  var getBackPage = req.query.page;
  var id = req.params.id;
  var product = db.get('products').find({ id: id }).value();
  res.render('products/viewOne', {
    'product': product,
    'pageCurrent': getBackPage
  });
}



// mission tomorrow
// 1. Phân trang 13 
// view a product and press get back , move to page current 