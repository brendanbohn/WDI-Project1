// DB
var mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/captainslog' // plug in the db name you've been using
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("db is open for business");
});

module.exports.Post = require('./post.js');
module.exports.User = require('./user.js');

// for full text search
//	db.posts.ensureIndex({ location: 'text', description: 'text', date: 'text'}, {name: 'My post index', weights: {location: 10, description: 2, date: 8}});

// db.ensureIndex()