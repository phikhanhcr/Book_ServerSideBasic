const express = require('express');
// upload file img 
var multer  = require('multer');
var router = express.Router();
var validation = require('../validation/createValidation');
var controller = require('../controller/book.controller');

var upload = multer({ dest: './public/uploads/' });
router.get('/' , controller.home);

// test , do nothing
router.get('/cookie' , (req , res , next) => {
  res.cookie('user' , 123);
  res.send("hell dmm");
})

router.get('/create' , controller.create)

// it is called midderware , the third parameter is next() // validation check input  
router.post('/create' , 
  upload.single('avatar'), 
  validation.createPost,
  controller.createPost
);

router.get('/search' , upload.single('avatar'),  controller.search)

router.get('/:id', controller.findId)

module.exports = router;