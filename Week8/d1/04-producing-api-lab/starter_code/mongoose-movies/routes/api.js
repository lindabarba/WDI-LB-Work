var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/api/movies');

router.get('/', moviesCtrl.getAllMovies);
router.get('/:id', moviesCtrl.getOneMovie);
router.post('/', moviesCtrl.createMovie);
router.put('/:id', moviesCtrl.updateMovie);
router.delete('/:id', moviesCtrl.deleteMovie);

module.exports = router;
