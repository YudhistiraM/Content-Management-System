var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  letter: Date,
  frequency: Number
});

module.exports = mongoose.model('Datadate', userSchema);
