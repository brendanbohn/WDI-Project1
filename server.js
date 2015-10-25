// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = require("./models/index");
// google maps api
require('dotenv').load();
var GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY;

// MIDDLEWARE //

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// TEST 
/*db.Post.create({location: 'asdfasdf'}, function(err, data) {
	console.log('error', err);
	console.log('data ', data);
	data.save(function(err) { 
		console.log(err); 
	});
});
*/




// ROUTES //

// GET route for the root url
app.get('/', function(req,res){
	res.render('index', {GOOGLE_MAPS_KEY: GOOGLE_MAPS_KEY});
});

// GET route for the map url
app.get('/map', function(req,res){
	res.render('map', {GOOGLE_MAPS_KEY: GOOGLE_MAPS_KEY});
});

// GET route for the profile url
app.get('/profile', function(req,res){
	db.Post.find({}, function(err, posts) {
		if(err) console.log(err);
		res.render('profile', {posts: posts, GOOGLE_MAPS_KEY: GOOGLE_MAPS_KEY});
	});
});

// POST route
app.post('/profile', function(req, res) {
	// console.log(req.body);
	db.Post.create(req.body, function(err, post) {
		console.log("post request went through",post);
		if (err) console.log('ermagerd', err);
		res.json(post);
	});
});

app.delete('/profile/:_id', function(req, res) {
	console.log('post id is ', req.params._id);
	db.Post.find({
		_id: req.params._id
	}).remove(function(err, post) {
		console.log("post deleted");
		res.json("The post is gone");
	});
});

app.listen(3000, function() {
  console.log("server running on port 3000");
});