console.log('Sanity check, client-side JS is working.');

function initMap() {
  var myLatLng = {lat: 37.78, lng: -122.44};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: myLatLng
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
  var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h3 id="firstHeading" class="firstHeading">San Francisco</h3>'+
        '<div id="bodyContent">'+
        '<p>Phasellus dignissim nibh et purus blandit facilisis. Aliquam vehicula pretium odio a venenatis. Nam rutrum lacus non ullamcorper hendrerit. Phasellus a tortor a sapien tincidunt egestas vitae faucibus metus. Vestibulum eu tempor magna. Duis cursus volutpat ligula id posuere. Vestibulum condimentum convallis lacus. Sed at lacus ac dui laoreet auctor.</p>'+
        '<p>October 20, 2015</p>'+
        '</div>'+
        '</div>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

$(document).ready(function(){

	initMap();

});