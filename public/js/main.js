// Make sure JS is working on the client
console.log('The client-side JS is working.');

/* 	AUTOCOMPLETE SEARCHBOX 	*/

// if there is an element with id="autocomplete"
if (document.getElementById("autocomplete")) {
	// creates a function called initAutocomplete
	var initAutocomplete = function() {
		
		  var Marker;
		  var newMarker;
			var place;
		  var infowindow;
		  var contentString;
	
		//Searchbox
		if (document.getElementById("autocomplete")) {
			var searchBox = new google.maps.places.SearchBox(document.getElementById("autocomplete"));
			// Need to set bias cities, states, etc.

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
		}
	};
	// calls the initAutocomplete created above
	initAutocomplete();
}



/* 	USER AUTHORIZATION 	*/

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

// runs once page is loaded
$(document).ready(function(){


/*	AUTHORIZATION 	*/

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