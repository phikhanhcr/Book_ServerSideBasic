const express = require('express');
var router = express.Router();
var validation = require('../validation/createValidation');
var controller = require('../controller/book.controller');

router.get('/' , controller.home);

router.get('/cookie' , (req , res , next) => {
  res.cookie('user' , 123);
  res.send("hell dmm");
})

router.get('/create' , controller.create)

// it is called midderware , the third parameter is next() // validation check input  
router.post('/create' , validation.createPost ,controller.createPost )

router.get('/search' , controller.search)

router.get('/:id', controller.findId)

module.exports = router;