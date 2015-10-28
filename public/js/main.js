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
  	} else {
    // hides the full navbar if user is loggged in
    	$('.logged-in').hide();
    }
  });
}

// runs once page is loaded
$(document).ready(function(){

/*	 AUTOCOMPLETE 	*/
	if (document.getElementById('searchTextField')) {
		var input = document.getElementById('searchTextField');
		var options = {types: ['(cities)']};
		autocomplete = new google.maps.places.Autocomplete(input, options);
		
		google.maps.event.addListener(autocomplete, 'places_changed', function() {
			var place = autocomplete.getPlace();
		});
	}

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