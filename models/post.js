var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
	location: {type: String, required: true},
	description: { type: String}, 
  date: { type: String},
  img: {type: String}
});

var Post = mongoose.model('Post', postSchema);


module.exports = Post;