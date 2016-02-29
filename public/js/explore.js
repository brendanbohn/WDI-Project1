// console.log('Sanity check, client-side JS is working.');

//defining these variables globally to prevent any scope issues with all the functions.
var infowindow; 
var marker;
var myLatLng;
var map;

function markListen(marker, contentString) {
  marker.addListener('click', function() {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}

// creates a map
function initMap(position) {
  // sets a latitude and longitude
  if (position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    myLatLng = {lat: lat, lng: lng};
  } else {
    myLatLng = {lat: 37.78, lng: -122.44};  
  }
  // creates a map in the element with id='map'
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: myLatLng
  });
  $.get('/api/marks', function (data) {
    console.log(data.user.posts);
    var posts = data.user.posts;
    console.log(posts.length);
    for (var i = 0; i < data.user.posts.length; i++) {
      
      var lat = data.user.posts[i].lat;
      var lng = data.user.posts[i].lng;
      var postLatLng = {lat: lat, lng: lng};
      console.log(postLatLng);
      // var icon = "/js/Pin.png";
      // put is username of the person who created it in the content string
      contentString = '<div class="trip-post" id="'+data.user.posts[i]._id+'"><div class="media text-left"><div class="media-left"><img class="media-object" src="'+data.user.posts[i].img+'" alt="..."></div><div class="media-body"><h3 class="media-heading">'+data.user.posts[i].location+'</h3><p>'+data.user.posts[i].description+'</p><p>'+data.user.posts[i].date+'<span class="pull-right">'+data.user.username+'</p></div></div></div>';

      // Create a marker for each place.
        marker =  new google.maps.Marker({
        map: map,
        title: data.user.posts[i].location,
        position: postLatLng
      });
      // creates an info window
      infowindow = new google.maps.InfoWindow({ maxWidth:500 }); // set max width to 500px
      // opens the infowindow when the marker is clicked
      markListen(marker, contentString);
    }
  });
}


var initAutocomplete = function() {
	  var Marker;
	  var newMarker;
		var place;
	  var infowindow;
	  var contentString;
	//Searchbox
	var searchBox = new google.maps.places.SearchBox(document.getElementById("autocomplete"));
		//Need to set bias to current city and business type to bars only!!!
	  	// Listen for the event fired when the user selects a prediction and retrieve
	  	searchBox.addListener('places_changed', function () {
	    	var places = searchBox.getPlaces();
	    	place = places[0];
	    	console.log("The place is: ", place);
	    	console.log(place.geometry.location.lat);
	    	if (places.length === 0) {
	    		alert('Place not found');
          //set alert for "NOT FOUND!"
	    	}
		});
};

initAutocomplete();

// checks if user is logged in
function checkAuth() {
	$.get('/current-user', function (data) {
		// console.log(data);
    // shows the full navbar if user is logged in
    if (data.user) {
    $('.logged-in').show();
  	} else {
    // hides the full navbar if user is loggged in
    	$('.logged-in').hide();
    }
  });
}

$(document).ready(function(){



/*	AUTHORIZATION 	*/

	// checks if user is logged in
	checkAuth();



/*	CREATE A NEW USER 	*/

	// on sumbit of the signup form
	$('#signup-form').submit(function(e){
		e.preventDefault();
		console.log('Prevented default on the sign-up form.');
		// serialize the form data
		var userData = $(this).serialize();
		// console.log(userData);
		// send data to server
		$.ajax({
			url: '/api/users',
			type: "POST",
			data: userData,
		})
		// if sucess
		.done(function(data) {
			$('#signup-form-modal').modal('hide');
			$('.logged-in').show();
			window.location.href= "/profile" ;
		})
		// if failure
		.fail(function(data) {
			alert("Failed to post");
		});
	});



/* 	LOGIN USER 	*/

	//when sign in form submit button is clicked
	$('#signin-form').submit(function(e){
		e.preventDefault();
		console.log('Prevented default on the sign-in form.');
		// serialize the form data
		var userData = $(this).serialize();
		console.log("User data from the sign-in form is: ", userData);
		$.ajax({
			url: '/login',
			type: "POST",
			data: userData,
		})
		.done(function(data) {
			// console.log('user data: ', data);
			$('#signin-form-modal').modal('hide');
			$('.logged-in').show();
			window.location.href= "/profile";
		})
		.fail(function(data) {
			alert("Failed to post");
		});
	});



/* 	LOGOUT USER 	*/

	// when logout button is clicked (it's in the settings dropdown)
	$('#logout-btn').click(function(){
		$.ajax ({
			url: 'logout',
			type: "GET",
		})
		// if succesffully logged out
		.done(function (data) {
			console.log("logged out");
			$('.logged-in').hide();
			window.location.href= "/";
		})
		// if failure
		.fail(function(data) {
			alert("Failed to log out");
		});
	});



});