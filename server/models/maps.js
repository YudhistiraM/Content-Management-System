var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  title : String,
  lat : Number,
  lng : Number
});

module.exports = mongoose.model('Maps',userSchema);
