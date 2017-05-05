var express = require('express');
var router = express.Router();

var moviesCtrl = require('../controllers/movies');

/* GET /movies/new listing. */
// router.get('/new', function(req, res, next) {
//   res.render('movies/new');
// });

router.get('/', moviesCtrl.index);
router.get('/new', moviesCtrl.new);
router.post('/', moviesCtrl.create);
router.get('/:id/edit', moviesCtrl.edit);
router.put('/:id', moviesCtrl.update);
router.delete('/:id', moviesCtrl.destroy);

module.exports = router;
