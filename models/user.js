var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: {type: String},
	username: {type: String, required: true},
	location: {type: String},
	bio: {type: String}, 
  img: {type: String}
});

var User = mongoose.model('User', userSchema);


module.exports = User;