var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var movieSchema = new Schema({
  title: {type: String, required: true},
  releaseYear: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    },
    min: 1927
  },
  rating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R']
  },
  cast: [String],
  nowShowing: Boolean
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
