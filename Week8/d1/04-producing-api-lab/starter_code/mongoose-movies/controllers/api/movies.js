var Movie = require('../../models/movie');

module.exports = {
  getAllMovies,
  getOneMovie,
  createMovie,
  updateMovie,
  deleteMovie
}

function getAllMovies(req, res) {
  Movie.find({}, function(err, movies) {
    if (err) return res.status(500).json({msg: err});
    res.status(200).json(movies);
  });
}

function getOneMovie(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    res.status(200).json(movie);
  });
}

function createMovie(req, res) {
  var mov = new Movie(req.body);
  mov.save(function(err) {
    if (err) return res.status(404).json({msg: err});
    res.status(201).json(mov);
  });
}

function updateMovie(req, res) {
  Movie.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, movie) {
    if (err) return res.status(404).json({msg: err});
    res.status(200).json(movie);
  });
}

function deleteMovie(req, res) {
  Movie.findByIdAndRemove(req.params.id, function(err, movie) {
    if (err) return res.status(404).json({msg: err});
    res.status(200).json(movie);
  });
}
