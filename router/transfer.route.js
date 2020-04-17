var controller = require('../controller/transfer.controller');
const express = require('express');
var router = express.Router();
var validation = require('../validation/checkTransfer');

router.get('/' , controller.create);
router.post('/' , validation.checkValidate ,controller.createTransfer);

module.exports = router;