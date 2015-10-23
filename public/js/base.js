console.log('Sanity check, client-side JS is working.');

$(document).ready(function(){

	$('#trip-form').submit(function(e){
		e.preventDefault();
		console.log('Prevented default on the trip submit form');
	});

});