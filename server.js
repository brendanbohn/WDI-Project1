// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var session = require('express-session');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var db = require("./models/index");
var User = require('./models/user');
var Post = require('./models/post');
// google maps api
require('dotenv').load();
var GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY;

// MIDDLEWARE //

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));


// TEST 
/*db.Post.create({location: 'asdfasdf'}, function(err, data) {
	console.log('error', err);
	console.log('data ', data);
	data.save(function(err) { 
		console.log(err); 
	});
});
*/




/* 	ROUTES 	*/



//	GET ROUTES

// GET route for the root url
app.get('/', function(req,res){
	res.render('explore', {GOOGLE_MAPS_KEY: GOOGLE_MAPS_KEY});
});

// users api
app.get('/api/users', function (req,res) {
	// res.json(data);
});

// GET route for the map url

app.get('/map', function(req,res){
	db.Post.find({}, function(err, posts) {
		if(err) console.log(err);
		res.render('map', {posts:posts, GOOGLE_MAPS_KEY: GOOGLE_MAPS_KEY});
	});
});

// GET route for the profile url
app.get('/profile', function (req,res){
	db.Post.find({}, function(err, posts) {
		if(err) console.log(err);
		res.render('profile', {posts: posts, GOOGLE_MAPS_KEY: GOOGLE_MAPS_KEY});
	});
});

// check auth current user auth

app.get('/current-user', function (req, res) {
	console.log(req.session.user);
	res.json({user: req.session.user});
});

// logout user

app.get('/logout', function (req, res) {
	req.session.user = null;
	res.render('explore', {GOOGLE_MAPS_KEY: GOOGLE_MAPS_KEY});
});



// POST ROUTES

// user POST route
app.post('/api/posts', function (req, res) {
	// console.log(req.body);
	db.Post.create(req.body, function(err, post) {
		console.log("post request went through",post);
		if (err) console.log('ermagerd', err);
		res.json(post);
	});
});

// create a user 
app.post('/api/users', function(req, res) {
  // console.log(req.body);
  User.createSecure(req.body.email, req.body.password, function (err, user) {
  	console.log('new secure User created.');
    req.session.user = user;
    // console.log(req.session.user);
    res.json(user);
  });
});

// authenticate the user 
app.post('/login', function (req, res) {
  // call authenticate function to check if password user entered is correct
  console.log(req.body);
  User.authenticate(req.body.email, req.body.password, function (err, user) {
  		req.session.user = user;
    	res.json(user);
  	});
});



// DELETE ROUTES

/*app.delete('/posts/:_id', function(req, res) {
	console.log('post id is ', req.params._id);
	db.Post.find({
		_id: req.params._id
	}).remove(function(err, post) {
		console.log("post deleted");
		res.json("The post is gone");
	});
});*/

// delete post route
app.delete('/posts/:id', function(req, res) {
	console.log('delete this post: ', req.params.id);
	db.Post.findOne({
		_id: req.params.id
	}).remove(function(err, post) {
		if (err) console.log(err);
		// console.log("post deleted: ", post._id, post.postBody);
		res.json("The post is gone");
	});
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server running on port 3000");
});