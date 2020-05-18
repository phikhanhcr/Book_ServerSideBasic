var controller = require('../controller/profile.controller');
const express = require('express');
var router = express.Router();

router.get('/' , controller.profile);

router.get('/:id' , controller.findId);

router.post('/' , controller.createPost);

router.delete('/:id' , controller.delete);

router.patch('/update/:id' , controller.update);

module.exports = router;