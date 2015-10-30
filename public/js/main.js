// Make sure JS is working on the client
console.log('The client-side JS is working.');

/* 	USER AUTHORIZATION 	*/
// checks if user is logged in
function checkAuth() {
	$.get('/current-user', function (data) {
		// console.log(data);
    // shows the full navbar if user is logged in
    if (data.user) {
    $('.logged-in').show();
    $('.main').hide();
  	} else {
    // hides the full navbar if user is loggged in
    	$('.logged-in').hide();
    }
  });
}

/* 	AUTOCOMPLETE SEARCHBOX 	*/
// creates a function for autocompleting the searchbox
var initAutocomplete = function() {
	var place;
	//Searchbox
	var searchBox = new google.maps.places.SearchBox(document.getElementById('searchTextField'));
	// Listen for the event fired when the user selects a prediction and retrieve
	searchBox.addListener('places_changed', function () {
	  var places = searchBox.getPlaces();
	  place = places[0];
	  document.getElementById('trip-location').value = place.formatted_address;
    document.getElementById('trip-lat').value = place.geometry.location.lat();
    document.getElementById('trip-lng').value = place.geometry.location.lng();
	  if (places.length === 0) {
	  	alert('Place not found');
      // set alert for "NOT FOUND!"
	  }
	});
};

/* 	ONCE PAGE IS LOADED 	*/

$(document).ready(function(){

/*	AUTHORIZATION 	*/
	checkAuth();

/* 	AUTOCOMPLETE 	*/
	// checks for an element with id="searchTextField" before executing the initAutocomplete function
	if (document.getElementById('searchTextField')) {
		initAutocomplete();
	}

/* 	EXPLORE SEARCH 	*/
	$('#explore-btn').click(function() {
		// e.preventDefault();
		// console.log('The explore button was clicked.');
		var exploreInput = $('#explore-search-input').val();
		// console.log(exploreInput);
		$('#explore-results').empty();
		$.ajax({
			url: '/api/explore/'+exploreInput,
			type: "GET",
		})
		// if success
		.done(function(data) {
			console.log('Server returned this data to the client: ', data);
			if (data.length>0) {
			for (var i=0; i<data.length; i++) {
				var postHtml = "<div class='media text-left trip-post'> <div class='media-left'> <img class='media-object' src='"+data[i].img+"' alt='...'></div><div class='media-body'><h3 class='media-heading'>"+data[i].location+"</h3><p>"+data[i].description+"</p><p>"+data[i].date+"<span class='pull-right'>"+data[i].username+"</p></div></div>";
				$('#explore-results').prepend(postHtml);
				$('#explore-search-input').val();
			}
			} else {
				$('#explore-results').prepend("<p class='text-center'>No posts match your search. Try another search.");
			}
		})
		// if failure
		.fail(function(data) {
			alert("Failed to post");
		});
	});


/*	CREATE A NEW USER 	*/
	// on sumbit of the signup form
	$('#signup-form').submit(function(e){
		e.preventDefault();
		console.log('Prevented default on the sign-up form.');
		// serialize the form data
		var userData = $(this).serialize();
		console.log("The data from the signup form is: ", userData);
		// send data to server
		$.ajax({
			url: '/api/users',
			type: "POST",
			data: userData
		})
		// if success
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
		// console.log('Prevented default on the sign-in form.');
		// serialize the form data
		var userData = $(this).serialize();
		// console.log("User data from the sign-in form is: ", userData);
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
			console.log("User is logged out.");
			window.location.href= "/";
		})
		// if failure
		.fail(function(data) {
			alert("Failed to log out");
		});
	});

/* 	LOG A NEW TRIP 	*/
	$('#trip-form').submit(function (e) {
		e.preventDefault();
		console.log('Prevented default on the sign-up form.');
		// serialize the form data
		console.log($('#inputImageUrl').val());
		var img = $('#inputImageUrl').val().split("");
		console.log(img);
		var tripData = $(this).serialize();
		// console.log('The data from the trip form is: ', tripData);
		$.ajax({
			url: '/api/posts',
			type: "POST",
			data: tripData
		}, function(output) { console.log( output); } )
		.done(function(data) {
			// console.log("Server returned the data: ", data);
			var postHtml = "<div class='media text-left trip-post'> <div class='media-left'> <img class='media-object' src='"+data.img+"' alt='...'></div><div class='media-body'><h3 class='media-heading'>"+data.location+"</h3><p>"+data.description+"</p><p>"+data.date+"<button data-id="+data._id+" type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button></p></div></div>";
			// console.log(postHtml);
			$("#tripStream").prepend(postHtml);
			$('#trip-form')[0].reset();
			$('#searchTextField').val('');
			// find user by user id and push Post into user.posts
					//	zelda.consoles.push(nin64);
					//	zelda.save();

		})
		.fail(function(data) {
			alert("Failed to post");
		});
	});

/* 	DELETE A TRIP 	*/
	$('#tripStream').on('click', '.close', function(e) {
	 	e.preventDefault();
	 	//console.log($(this));
	 	var post = $(this).data();
	 	var postId = $(this).data().id;
	 	// console.log(postId);
		var deletedPost = $(this).closest('div.trip-post');
		// console.log(deletedPost);
		//$(deletedPost).empty();
		$.ajax({
			url:'/posts/' + postId,
			type: "DELETE"
		})
		.done(function(data) {
			// console.log(data);
			$(deletedPost).remove();
			// console.log("post has been deleted");
		})
		.fail(function(data) {
			alert("failed to delete post");
		});
	});

});






/*	 AUTOCOMPLETE 	graveyard 	*/

/*	if (document.getElementById('searchTextField')) {
		var input = document.getElementById('searchTextField');
		var options = {types: ['(cities)']};
		autocomplete = new google.maps.places.Autocomplete(input, options);
		
		google.maps.event.addListener(autocomplete, 'places_changed', function() {
			var place = autocomplete.getPlace();
			console.log(place);
		});
	}*/

/*	function initialize() {
	    var input = document.getElementById('searchTextField');
	    var options = {types: ['(cities)']};
	    var autocomplete = new google.maps.places.Autocomplete(input, options);
	    google.maps.event.addListener(autocomplete, 'place_changed', function () {
	        var place = autocomplete.getPlace();
	        document.getElementById('trip-lat').value = place.geometry.location.lat();
	        document.getElementById('trip-lng').value = place.geometry.location.lng();
	        alert("Initialize function is working!");
	        alert(place.name);
	       	alert(place.address_components[0].long_name);
	    });
	}
	initialize();*/