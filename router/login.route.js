const express = require('express');
var router = express.Router();
var controller = require('../controller/login.controller');

router.get('/' , controller.login);

router.post('/' , controller.postLogin);

module.exports = router;