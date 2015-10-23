console.log('Sanity check, client-side JS is working.');

var map;

$(document).ready(function(){

	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 37.78, lng: -122.44},
	  zoom: 3
	});

});