// Global Variables
// ---------------------------------------------------------------------
// Map containing variable
var directionalMap;

// Direction Display (declared globally for single direction routes)
var directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: {
        strokeColor: "teal"
    }
});

// Creates the gservice factory.
// This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($rootScope, $http) {

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        // Array of locations obtained from API calls
        var locations = [];

        // Selected Location (initialize to center of America)
        var selectedLat = 39.50;
        var selectedLong = -98.35;

        // Handling Clicks and location selection
        googleMapService.clickLat = 0;
        googleMapService.clickLong = 0;

        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function(latitude, longitude, filteredResults) {

            // Clears the holding array of locations
            locations = [];

            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;

            // If filtered results are provided in the refresh() call...
            if (filteredResults) {

                // Then convert the filtered results into map points.
                locations = convertToMapPoints(filteredResults);

                // Then, initialize the map -- noting that a filter was used (to mark icons yellow)
                initialize(latitude, longitude, true);

            } else {

                // Perform an AJAX call to get all of the records in the db.
                $http.get('/active-stores').success(function(response) {

                    // Convert the results into Google Map Format
                    locations = convertToMapPoints(response);

                    // Then initialize the map.
                    initialize(latitude, longitude);
                }).error(function() {});

            }

        };

        // Private Inner Functions
        // --------------------------------------------------------------
        // Convert a JSON of stores into map points
        var convertToMapPoints = function(response) {

            // Clear the locations holder
            var locations = [];

            // Loop through all of the JSON entries provided in the response
            for (var i = 0; i < response.length; i++) {
                var store = response[i];

                // Create popup windows for each record
                var contentString =
                    '<p><b>Store Name</b>: ' + store.storeName +
                    '<br><b>Address</b>: ' + store.storeAddress +
                    '<br><b>Category</b>: ' + store.storeCategory +
                    '</p><br><button class="btn btn-default btn-dark" onclick="calculateAndDisplayRoute(' + store.storeLocation[1] + "," + store.storeLocation[0] + ')"><span class="glyphicon glyphicon-share-alt"></span>&nbspGet Directions</button>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(store.storeLocation[1], store.storeLocation[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    storeName: store.storeName,
                    storeAddress: store.storeAddress
                });
            }
            // location is now an array populated with records in Google Maps format
            return locations;
        };

        // Initializes the map
        var initialize = function(latitude, longitude, filter) {

            // Uses the selected lat, long as starting point
            var myLatLng = {
                lat: selectedLat,
                lng: selectedLong
            };

            // If map has not been created already...
            if (!map) {

                // Create a new map and place in the index.html page
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    center: myLatLng
                });

            }

            directionalMap = map

            // Initialize bounds variable to hold radial bounds
            var bounds = new google.maps.LatLngBounds();

            // If a filter was used set the icons yellow, otherwise blue
            if (filter) {
                icon = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
            } else {
                icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
            }

            if (locations) {

                // Loop through each location in the array and place a marker
                locations.forEach(function(n, i) {

                    var marker = new google.maps.Marker({
                        position: n.latlon,
                        map: map,
                        title: n.storeName,
                        icon: icon,
                    });

                    // For each marker created, add a listener that checks for clicks
                    google.maps.event.addListener(marker, 'click', function(e) {

                        // When clicked, open the selected marker's message
                        currentSelectedMarker = n;
                        n.message.open(map, marker);
                        document.getElementById('txtToLocation').value = n.latlon;

                    });

                    // Extend radial bound according to marker position
                    bounds.extend(marker.position);

                });

                // Fit the radial bounds
                map.fitBounds(bounds);

            } // end if location not empty

            // Set initial location as a bouncing red marker
            var initialLocation = new google.maps.LatLng(latitude, longitude);
            var marker = new google.maps.Marker({
                position: initialLocation,
                animation: google.maps.Animation.BOUNCE,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            lastMarker = marker;

            // Function for moving to a selected location
            map.panTo(new google.maps.LatLng(latitude, longitude));

            // Clicking on the Map moves the bouncing red marker
            google.maps.event.addListener(map, 'click', function(e) {
                var marker = new google.maps.Marker({
                    position: e.latLng,
                    animation: google.maps.Animation.BOUNCE,
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                });

                // When a new spot is selected, delete the old red bouncing marker
                if (lastMarker) {
                    lastMarker.setMap(null);
                }

                // Create a new red bouncing marker and move to it
                lastMarker = marker;
                map.panTo(marker.position);

                // Update Broadcasted Variable (lets the panels know to change their lat, long values)
                googleMapService.clickLat = marker.getPosition().lat();
                googleMapService.clickLong = marker.getPosition().lng();
                $rootScope.$broadcast("clicked");

            });

        };

        // Refresh the page upon window load. Use the initial latitude and longitude
        google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh(selectedLat, selectedLong));

        return googleMapService;
    });

function calculateAndDisplayRoute(lati, longi) {

    var directionsService = new google.maps.DirectionsService();

    directionsDisplay.setMap(directionalMap);
    directionsDisplay.setOptions({
        suppressMarkers: true
    });

    var start = new google.maps.LatLng(document.getElementById('txtLatitude').value, document.getElementById('txtLongitude').value);
    var end = new google.maps.LatLng(lati, longi);

    directionsService.route({
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        },

        function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
}
