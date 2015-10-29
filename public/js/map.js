console.log('Sanity check, client-side JS is working.');

// creates a map
function initMap(position) {
  // sets a latitude and longitude
  if (position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var myLatLng = {lat: lat, lng: lng};
  } else {
    var myLatLng = {lat: 37.78, lng: -122.44};  
  }
  // creates a map in the element with id='map'
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: myLatLng
  });
  $.get('/api/marks', function (data) {
    console.log(data.user.posts);
    var posts = data.user.posts;
    console.log(posts.length);
    for (var i = 0; i < data.user.posts.length; i++) {
      
      var lat = data.user.posts[i].lat;
      var lng = data.user.posts[i].lng;
      var postLatLng = {lat: lat, lng: lng};
      console.log(postLatLng);
      // var icon = "/js/Pin.png";
      // put is username of the person who created it in the content string
      contentString = '<div class="trip-post" id="'+data.user.posts._id+'"><div class="media text-left"><div class="media-left"><img class="media-object" src="'+data.user.posts[i].img+'" alt="..."></div><div class="media-body"><h3 class="media-heading">'+data.user.posts[i].location+'</h3><p>'+data.user.posts[i].description+'</p><p>'+data.user.posts[i].date+'<span class="pull-right">'+data.user.username+'</p></div></div></div>';

      // Create a marker for each place.
        var marker =  new google.maps.Marker({
        map: map,
        title: data.user.posts[i].location,
        position: postLatLng
      });
          // creates an info window
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      // opens the infowindow when the marker is clicked
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });   
    }
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

/* function setMarks() {
  //GET REQUEST TO LOAD MARKERS FROM SERVER
  }*/
// executes once the page is fully loaded
$(document).ready(function(){

  // creates the map
  if (navigator.geolocation) {
      // map center is the user's location if they share their location
      navigator.geolocation.getCurrentPosition(initMap);
  } else {
      // centers map with default San Francisco
      initMap();
  }

  // checks if user is logged in
  checkAuth();

});