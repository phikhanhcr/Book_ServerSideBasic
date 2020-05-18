var controller = require('../controller/products.controller');
const express = require('express');
var router = express.Router();

router.get('/' , controller.product);

router.post('/' , controller.createPost);

router.put('/:id' , controller.findApi);

router.patch('/:id' , controller.patch);

router.delete('/:id' , controller.delete);
module.exports = router;