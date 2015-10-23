var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	location: {type: String, required: true},
	description: { type: String}, 
  date: { type: Date, default: Date.now },
  img: {type: String}
});

var Post = mongoose.model('Post', postSchema);


module.exports = Post;