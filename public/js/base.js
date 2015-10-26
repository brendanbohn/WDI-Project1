console.log('Sanity check, client-side JS is working.');



		var initAutocomplete = function() {
			//Searchbox

	    var searchBox = new google.maps.places.SearchBox(document.getElementById("autocomplete"));
			

			//Need to set bias to current city and business type to bars only!!!


			// Bias the SearchBox results towards current map's viewport.
		  	map.addListener('bounds_changed', function() {
		    searchBox.setBounds(map.getBounds());
		  	});


		  	// Listen for the event fired when the user selects a prediction and retrieve
		  	searchBox.addListener('places_changed', function() {
		    	var places = searchBox.getPlaces();
		    	place = places[0];
		    	console.log(place);
		    	if (places.length === 0) {
		    		return;
	          //set alert for "NOT FOUND!"
		    	}
			});
		};


$(document).ready(function(){
		
	initAutocomplete();

// CREATE A NEW USER
	$('#signup-form').submit(function(e){
		e.preventDefault();
		console.log('Prevented default on the sign-up form.');
		var userData = $('#signup-form').serialize();

		$.ajax({
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
	});


// POST A TRIP
	$('#trip-form').submit(function(e){
		e.preventDefault();
		// console.log('Prevented default on the trip submit form');
		var tripData = $('#trip-form').serialize();
		console.log('Before the ajax post: ', tripData);

		$.ajax({
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
		});
	});

	// DELETE A TRIP
		$('#tripStream').on('click', '.close', function(e) {
	  	e.preventDefault();
	  	var post = $(this).data();
	  	var postId = $(this).data().id;
	  	console.log(postId);
			var deletedPost = $(this).closest('div.trip-post');
			console.log(deletedPost);
			$(deletedPost).empty();
		});

// GOOGLE MAPS STUFF



});