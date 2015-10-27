console.log('Sanity check, client-side JS is working.');

if (document.getElementById("autocomplete")) {
var initAutocomplete = function() {
	
	  var Marker;
	  var newMarker;
		var place;
	  var infowindow;
	  var contentString;

	//Searchbox
	if (document.getElementById("autocomplete")) {
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
	}
};
initAutocomplete();
}

// checks if user is logged in
function checkAuth() {
	$.get('/current-user', function (data) {
		console.log(data);
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

	checkAuth();

// CREATE A NEW USER
	$('#signup-form').on('submit', function (e){
		console.log('clicked submit');
		e.preventDefault();
		console.log('Prevented default on the sign-up form.');
		var userData = $('#signup-form').serialize();
		console.log(userData);
	});

/*	$.ajax({
			url: '/api/users',
			type: "POST",
			data: userData,
		})
		.done(function(data) {
			console.log('user data: ', data);
			$('#signup-form-modal').modal('hide');
		})
		.fail(function(data) {
			alert("Failed to post");
		});
	});*/


// POST A TRIP
	$('#trip-form').submit(function(e){
		e.preventDefault();
		// place = $('#autocomplete').val();
		console.log(place);
		// console.log('Prevented default on the trip submit form');
		$('#trip-name').val(place.name);
		$('#trip-lat').val(place.geometry.location.lat);
		$('#trip-lng').val(place.geometry.location.lng);
		var tripData = $('#trip-form').serialize();
		console.log('Before the ajax post: ', tripData);

/*		$.ajax({
			url: '/api/posts',
			type: "POST",
			data: tripData
		})
		.done(function(data) {
			console.log("AJAX response: made a new post", data);
			var postHtml = "<div class='media text-left trip-post'> <div class='media-left'> <img class='media-object' src='"+data.img+"' alt='...'></div><div class='media-body'><h3 class='media-heading'>"+data.location+"</h3><p>"+data.description+"</p><p>"+data.date+"<button data-id="+data._id+" type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button></p></div></div>";
			// console.log(postHtml);
			$("#tripStream").prepend(postHtml);
			$('#trip-form')[0].reset();
			$('#trip-form-modal').modal('hide');
		})
		.fail(function(data) {
			alert("Failed to post");
		});*/
	});

	// DELETE A TRIP
		$('#tripStream').on('click', '.close', function(e) {
	  	e.preventDefault();
	  	//console.log($(this));
	  	var post = $(this).data();
	  	var postId = $(this).data().id;
	  	console.log(postId);
			var deletedPost = $(this).closest('div.trip-post');
			console.log(deletedPost);
			//$(deletedPost).empty();
			$.ajax({
				url:'/posts/' + postId,
				type: "DELETE"
			})
			.done(function(data) {
				console.log(data);
				$(deletedPost).remove();
				console.log("post has been deleted");
			})
			.fail(function(data) {
				console.log("failed to delete post");
			});
		});

});