var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema =mongoose.Schema;

var userSchema = mongoose.Schema({
	name: {type: String},
	username: {type: String, required: true},
	password: {type: String, require: true},
	email: {type: String,
		required: true,
		unique: true,
	},
	location: {type: String},
	bio: {type: String}, 
  img: {type: String},
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});



var User = mongoose.model('User', userSchema);

module.exports = User;