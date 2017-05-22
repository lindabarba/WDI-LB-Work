var express = require('express');
var router = express.Router();
var puppiesCtrl = require('../controllers/api/puppies');

/* GET users listing. */
router.get('/', puppiesCtrl.getAllPuppies);
router.get('/:id', puppiesCtrl.getOnePuppy);
router.post('/', puppiesCtrl.createPuppy);
router.put('/:id', puppiesCtrl.updatePuppy);
router.delete('/:id', puppiesCtrl.deletePuppy);

module.exports = router;
