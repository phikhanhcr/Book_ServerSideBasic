var controller = require('../controller/cart.controller');
const express = require('express');
var router = express.Router();

router.get('/add/:productId' , controller.addToCart);

module.exports = router;