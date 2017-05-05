const db = require('./../db/db');

modelMethods = {

  primaryKey: 1,

  addMovie: function(title, location, description, year) {

    let newMovieEntry = {
      "id": this.primaryKey,
      "title": title,
      "location": location,
      "description": description,
      "year": year
    };

    db[this.primaryKey] = newMovieEntry;
    this.primaryKey++;

  },

  getAllMovies: function() {
    return db;
  },

  showMovie: function(id) {
    return db[id];
  },

  updateMovie: function(movieID, movieTitle, movieLocation, movieDescription, movieYear) {
    let objToUpdate = db[movieID];
    objToUpdate.id = movieID;
    objToUpdate.title = movieTitle;
    objToUpdate.location = movieLocation;
    objToUpdate.description = movieDescription;
    objToUpdate.year = movieYear;
    // console.log("Movie.js > updateMovie > ", id);
  },

  deleteMovie: function(id) {
    delete db[id];
    // console.log("Movie.js > deleteMovie > id =", id);
  }

};

module.exports = modelMethods;
