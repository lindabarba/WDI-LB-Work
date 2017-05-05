var express = require('express');
var router = express.Router();
var movies = require('./../controllers/movies-controller');

router.get('/', movies.index);
router.get('/new', movies.new);
router.post('/create', movies.create);
router.get('/:id', movies.show);
router.get('/:id/edit', movies.edit);
router.put('/:id', movies.update);
router.delete('/:id', movies.destroy);

module.exports = router;
