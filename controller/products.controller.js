const md5 = require('md5');
var removeAccents = require("../removeAccents");
const db = require('../db');

module.exports.product = (req , res , next) => {
  // var randomIndex = Math.floor(Math.random() * 9);
  // var url = `/images/${randomIndex}.jpg`;
  // phan trang , 8 products per page 
  var page = req.query.page || 1;
  var perPage = 8 ;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  res.render('products/product' , {
    'products' : db.get('products').value().slice(start , end),
    "href" : "1"
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
  res.render('products/product' , {
    'products' : productsSearch.slice(start , end),
    'nothing' : nothing
  }) 
}



module.exports.viewProduct = (req, res, next) => {
  var id = req.params.id;
  var product = db.get('products').find({id : id}).value();
  res.render('products/viewOne' , {
    'product' : product
  })
}
// 1. Complete Unit 20 => x
// 2. Add Search function => v
// 3. Add View a product function (find) =>  v 
// 4. Revise Cookie , singed cookie , 