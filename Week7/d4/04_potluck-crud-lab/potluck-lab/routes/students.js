var express = require('express');
var router = express.Router();

var studentCtrl = require('../controllers/students');

router.get('index', studentCtrl.index);
router.get('/new', studentCtrl.new);

module.exports = router;
