var mongoose = require('mongoose');

// The factSchema is used to embedded subdocs in a student doc.
// There is no model and no 'facts' collection
var factSchema = new mongoose.Schema({
  text: String,
  created: { type: Date, default: Date.now }
});

var studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  cohort: Number,
  facts: [factSchema],
  googleId: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);

// created is depreciated by new mongoose attribute built-in
