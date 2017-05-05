const model = require('./../models/Movie');

module.exports = moviesController = {

  index: function(req, res, next) {
    res.render('index', { movies: model.getAllMovies() });
  },

  new: function(req, res, next) {
    res.render('new');
  },

  edit: function(req, res, next) {
    var id = req.params.id;
    res.render('edit', { movie: model.showMovie(id)});
  },

  create: function(req, res, next) {
    let params = req.body;
    model.addMovie(params.movieTitle, params.movieLocation, params.movieDescription, params.movieYear);
    res.redirect('/');
  },

  update: function(req, res, next) {
    let id = req.params.id;
    let body = req.body;
    // console.log("movie-controller > update > ", id);
    model.updateMovie(id, body.movieTitle, body.movieLocation, body.movieDescription, body.movieYear);
    res.redirect('/');
  },

  show: function(req, res, next) {
    let id = req.params.id;
    res.render('show', { movie: model.showMovie(id) });
  },

  destroy: function(req, res, next) {
    var id = req.params.id;
    // console.log("movies-controller > destroy > id is", id);
    model.deleteMovie(id);
    res.redirect('/');
  }

};
