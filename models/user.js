
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Set up schema
var userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]

});

module.exports = mongoose.model('User', userSchema);