var markers = [];
var map; 
function myMap() {
//read json
  $.ajax({
     url: 'https://api.myjson.com/bins/8ys8n',
     dataType: 'json',
     success: function(data) {
        var clatitude = data[0].latitude;
        var clongitude = data[0].longitude;
        var points = [];
        var options = [];
        
        //getting data
        $.each(data, function(key, val) {   
          options.push('<option id="' + val.type + '">' + val.type + '</option>');
        });

        //create map
        var myCenter = new google.maps.LatLng(clatitude,clongitude);
        var mapCanvas = document.getElementById("map");
        var mapOptions = {
          center: myCenter, 
          zoom: 13,
          panControl: true,
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          overviewMapControl: true,
          rotateControl: true   
        };
        map = new google.maps.Map(mapCanvas, mapOptions);

        //create sellect
        $('<select/>', {
           'id': 'myselect',
           html: '<option value="All">All</option>' + jQuery.unique(options).join('')
        }).appendTo('#selectPlaces');

        //set markers
        var marker, latitute, longitude, serviceType, serviceName, servicePoint, ic;
        $.each(data, function(key, val) {  
          latitute = val.latitude;
          longitude = val.longitude;
          serviceName = val.name;
          serviceType = val.type;

          //set icons
          if (serviceType == "rent"){
            ic = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }
          else if (serviceType == "service"){
            ic = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }
          else{
            ic = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }

          //set points
          servicePoint = new google.maps.LatLng(latitute,longitude); 
          addMarker(servicePoint, map, serviceName, ic);
        });

        //select markers
          $('#myselect').on('change', function() {
            clearMarkers();      
            var marker, latitute, longitude, serviceType, serviceName, servicePoint, ic;
            if (this.value == "rent"){
              $.each(data, function(key, val) {  
                latitute = val.latitude;
                longitude = val.longitude;
                serviceName = val.name;
                serviceType = val.type;
                ic = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'

                //set points
                if(serviceType == "rent"){
                  servicePoint = new google.maps.LatLng(latitute,longitude); 
                  addMarker(servicePoint, map, serviceName, ic);
                }
              });
            }
            else if (this.value == "service"){
              $.each(data, function(key, val) {  
                latitute = val.latitude;
                longitude = val.longitude;
                serviceName = val.name;
                serviceType = val.type;
                ic = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'

                //set points
                if(serviceType == "service"){
                  servicePoint = new google.maps.LatLng(latitute,longitude); 
                  addMarker(servicePoint, map, serviceName, ic);
                }
              });
            }
            else if (this.value == "parking"){
              $.each(data, function(key, val) {  
                latitute = val.latitude;
                longitude = val.longitude;
                serviceName = val.name;
                serviceType = val.type;
                ic = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'

                //set points
                if(serviceType == "parking"){
                  servicePoint = new google.maps.LatLng(latitute,longitude); 
                  addMarker(servicePoint, map, serviceName, ic);
                }
              });
            }
            else{
              $.each(data, function(key, val) {  
                latitute = val.latitude;
                longitude = val.longitude;
                serviceName = val.name;
                serviceType = val.type;
                //set icons
                if (serviceType == "rent"){
                  ic = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                }
                else if (serviceType == "service"){
                  ic = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                }
                else{
                  ic = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                }

                //set points
                servicePoint = new google.maps.LatLng(latitute,longitude); 
                addMarker(servicePoint, map, serviceName, ic);
              });
            }
          });

        //var markerCluster = new MarkerClusterer(map, markers);

     },
    statusCode: {
       404: function() {
         alert('There was a problem with the server.  Try again soon!');
       }
     }
  });

}

// Adds a marker to the map.
function addMarker(location, map, title, ic) {
  var marker = new google.maps.Marker({
    position: location,  
    map: map,
    title: title,
    icon: ic
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

google.maps.event.addDomListener(window, 'load', myMap);





