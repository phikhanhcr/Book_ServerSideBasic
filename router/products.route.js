var controller = require('../controller/products.controller');
const express = require('express');
var router = express.Router();

router.get('/' , controller.product);
router.get('/search' , controller.searchProduct);
router.get('/:id' , controller.viewProduct);

//router.get('/cartadd/:productId' , controller.addToCart);

module.exports = router;