console.log('Sanity check, client-side JS is working.');

var map;

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    scrollwheel: false,
    zoom: 8
  });
}

$(document).ready(function(){

	initMap();

// DELETE A TRIP
	$('#tripStream').click(function(e){
		var deletedPost = $(this).closest('div');
		console.log(deletedPost);
		$(deletedPost).empty();
	});


// POST A TRIP
	$('#trip-form').submit(function(e){
		e.preventDefault();
		// console.log('Prevented default on the trip submit form');
		var tripData = $('#trip-form').serialize();
		//console.log(tripData);

		$.ajax({
			url: '/profile',
			type: "POST",
			data: tripData
		})
		.done(function(data) {
			console.log("made a new post", data);
			var postHtml = "<div class='media text-left trip-post'> <div class='media-left'> <img class='media-object' src='"+data.tripImage+"' alt='...'></div><div class='media-body'><h3 class='media-heading'>"+data.tripCityState+"</h3><p>"+data.tripDescription+"</p><p>"+data.tripDate+"<a href='#'><span class='pull-right glyphicon glyphicon-pencil'></span></a></p></div></div>";
			console.log(postHtml);
			$("#tripStream").prepend(postHtml);
			$('#trip-form')[0].reset();
			$('#trip-form-modal').modal('hide');
		})
		.fail(function(data) {
			$('#fail').modal();
			alert("Failed to post");
		});
	});


});