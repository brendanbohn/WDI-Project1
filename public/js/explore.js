console.log('Sanity check, client-side JS is working.');

$(document).ready(function(){

// CREATE A NEW USER
	$('#signup-form').submit(function(e){
		e.preventDefault();
		console.log('Prevented default on the sign-up form.');
		var userData = $('#signup-form').serialize();
		console.log(userData);
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

});