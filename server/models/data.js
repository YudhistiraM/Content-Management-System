var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  letter: String,
  frequency: Number
});

module.exports = mongoose.model('Data', userSchema);
