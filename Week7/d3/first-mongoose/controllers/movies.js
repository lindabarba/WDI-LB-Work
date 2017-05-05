var Movie = require('../models/movie');

function index(req, res) {
  Movie.find({}, function(err, movies) {
    res.render('movies/index', {movies});
  });
}

function newMovie(req, res) {
  res.render('movies/new');
}

function create(req, res) {
  if (!req.body.nowShowing) req.body.nowShowing = false;
  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
  if (req.body.cast) req.body.cast = req.body.cast.split(',');
  for (var key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  var movie = new Movie(req.body);
  movie.save(function(err) {
    if (err) return res.render('movies/new');
    res.redirect('/movies');
  });
}

function edit(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
  res.render('movies/edit', {movie});
  });
}

function update(req, res) {
  Movie.findByIdAndUpdate(req.params.id, req.body, function(err, movie) {
    if (err) return res.render('movies/index');
    res.redirect('/movies');
  });
}

function destroy(req, res) {
  Movie.findByIdAndRemove(req.params.id, function(err, movie) {
    if (err) return res.render('movies/index');
    res.redirect('/movies');
  });
}

module.exports = {
  new: newMovie,
  create,
  index,
  edit,
  update,
  destroy
}
