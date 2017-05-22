var mongoose = require('mongoose');

var foodSchema = new mongoose.Schema({
  name: {type: String, required: true},
  group: {type: String, required: true, enum: ['Veg', 'Dairy', 'Meat', 'Bread']},
  shelfLife: {type: Number, required: true}
});

foodSchema.virtual('description').get(function() {
  return `${this.name} (${this.group}) - Good for ${this.shelfLife} days`;
});

foodSchema.statics.findByGroup = function(group, cb) {
  return this.find({group: group}, cb);
};

foodSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret, options) {
    ret.password = 'I am a password';
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('Food', foodSchema);
