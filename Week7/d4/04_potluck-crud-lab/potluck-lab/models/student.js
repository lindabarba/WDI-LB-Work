var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dishSchema = new Schema({
  cuisine: {type: String, enum: ['Main', 'Side']},
  dish: String
});

var studentSchema = new Schema({
  name: String,
  dishes: [dishSchema]
});

module.exports = mongoose.model('Student', studentSchema);
