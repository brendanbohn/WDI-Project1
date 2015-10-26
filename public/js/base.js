console.log('Sanity check, client-side JS is working.');

$(document).ready(function(){


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
		console.log('Before the ajax post: ', tripData);

		$.ajax({
			url: '/profile',
			type: "POST",
			data: tripData
		})
		.done(function(data) {
			console.log("AJAX response: made a new post", data);
			var postHtml = "<div class='media text-left trip-post'> <div class='media-left'> <img class='media-object' src='"+data.img+"' alt='...'></div><div class='media-body'><h3 class='media-heading'>"+data.location+"</h3><p>"+data.description+"</p><p>"+data.date+"<a href='#'><span class='pull-right glyphicon glyphicon-pencil'></span></a></p></div></div>";
			// console.log(postHtml);
			$("#tripStream").prepend(postHtml);
			$('#trip-form')[0].reset();
			$('#trip-form-modal').modal('hide');
		})
		.fail(function(data) {
			alert("Failed to post");
		});
	});


});