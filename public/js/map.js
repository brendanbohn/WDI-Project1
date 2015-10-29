console.log('Sanity check, client-side JS is working.');



// creates a map
function initMap(position) {
  // sets a latitude and longitude]
  if (position) {
    var lat = position.coords.latitude
    var lng = position.coords.longitude    
    var myLatLng = {lat: lat, lng: lng}
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
      // contentString = '<div class="trip-post" id="'+user.posts._id+'"><div class="media text-left"><div class="media-left"><img class="media-object" src="'+user.posts[i].img+'" alt="..."></div><div class="media-body"><h3 class="media-heading">'+user.posts[i].location+'</h3><p>'+user.posts[i].description+'</p><p>'+user.posts[i].date+'<button data-id="'+user.posts[i]._id+'" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></p></div></div></div>';

      // Create a marker for each place.
        var marker =  new google.maps.Marker({
        map: map,
        title: data.user.posts[i].location,
        position: postLatLng
      });
      // infowindow = new google.maps.InfoWindow(); 
      // listenMarker(Marker, contentString);   
    }
  });
}
/*   $.get('/api/marks', function (data) {
      console.log(data.user.posts);
      var posts = data.user.posts;
      console.log(posts.length);
      for (var i = 0; i < data.user.posts.length; i++) {
        
        var lat = data.user.posts[i].lat;
        var lng = data.user.posts[i].lng;
        var postLatLng = {lat: lat, lng: lng};
        console.log(postLatLng);
        // var icon = "/js/Pin.png";
        // contentString = '<div class="trip-post" id="'+user.posts._id+'"><div class="media text-left"><div class="media-left"><img class="media-object" src="'+user.posts[i].img+'" alt="..."></div><div class="media-body"><h3 class="media-heading">'+user.posts[i].location+'</h3><p>'+user.posts[i].description+'</p><p>'+user.posts[i].date+'<button data-id="'+user.posts[i]._id+'" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></p></div></div></div>';
  
        // Create a marker for each place.
          var marker =  new google.maps.Marker({
          map: map,
 
          title: data.user.posts[i].location,
          position: postLatLng
        });
        // infowindow = new google.maps.InfoWindow(); 
        // listenMarker(Marker, contentString);   
      }
    });*/
/*  // sets a marker on the map
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
        '</div>';*/
  // creates an info window
/*  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  // opens the infowindow when the marker is clicked
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}*/

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

 function setMarks() {
  //GET REQUEST TO LOAD MARKERS FROM SERVER
  }
// executes once the page is fully loaded
$(document).ready(function(){

  // creates the map
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(initMap);
  } else {
      initMap();
  }

  // checks if user is logged in
  checkAuth();

});