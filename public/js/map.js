console.log('Sanity check, client-side JS is working.');

// creates a map
function initMap() {
  // sets a latitude and longitude
  var myLatLng = {lat: 37.78, lng: -122.44};
  // creates a map in the element with id='map'
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: myLatLng
  });
  // sets a marker on the map
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
  // creates the content used in the infowindow when the marker is clicked
  var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h3 id="firstHeading" class="firstHeading">San Francisco</h3>'+
        '<div id="bodyContent">'+
        '<p>Phasellus dignissim nibh et purus blandit facilisis. Aliquam vehicula pretium odio a venenatis. Nam rutrum lacus non ullamcorper hendrerit. Phasellus a tortor a sapien tincidunt egestas vitae faucibus metus. Vestibulum eu tempor magna. Duis cursus volutpat ligula id posuere. Vestibulum condimentum convallis lacus. Sed at lacus ac dui laoreet auctor.</p>'+
        '<p>October 20, 2015</p>'+
        '</div>'+
        '</div>';
  // creates an info window
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  // opens the infowindow when the marker is clicked
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

// checks if user is logged in
function checkAuth() {
  $.get('/current-user', function (data) {
    // shows the full navbar if user is logged in
    if (data.user) {
    $('.logged-in').show();
    } else {
    // hides the full navbar if user is loggged in
      $('.logged-in').hide();
    }
  });
}

// executes once the page is fully loaded
$(document).ready(function(){

  // creates the map
	initMap();

  // checks if user is logged in
  checkAuth();

});