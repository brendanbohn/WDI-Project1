var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema =mongoose.Schema;

var UserSchema = mongoose.Schema({
	name: String,
	username: String,
	passwordDigest: String,
	email: String,
	location: String,
	bio: String, 
  img: String,
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

UserSchema.statics.createSecure = function (email, password, callback) {
  // `this` references our User model
  // store it in variable `UserModel` because `this` changes context in nested callbacks

  var UserModel = this;

  // hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
    console.log('salt: ', salt);  // changes every time
    bcrypt.hash(password, salt, function (err, hash) {

      // create the new user (save to db) with hashed password
      UserModel.create({
        email: email,
        passwordDigest: hash,
      }, callback);
    });
  });
};



var User = mongoose.model('User', UserSchema);

module.exports = User;