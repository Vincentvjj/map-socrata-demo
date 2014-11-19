/*
    app.js
    our application code

    Alternative fuel locations in Chicago dataset:
    https://data.cityofchicago.org/resource/alternative-fuel-locations.json

    Chicago coordinates:
    lat: 41.8369
    lng: -87.6847
 */

"use strict";

$(document).ready(function() {
    var mapElem = document.getElementById('map');
    var center = {
        lat: 41.8369,
        lng: -87.6847

    };

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();

    $.getJSON('https://data.cityofchicago.org/resource/alternative-fuel-locations.json')
        .done(function(data) {
            data.forEach(function(locations) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(locations.location.latitude),
                        lng: Number(locations.location.longitude)
                    },

                    map: map
                });

                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<p>' + locations.station_name + '</p>';
                    html += '<p>' + locations.street_address + '</p>';
                    infoWindow.setContent(html);
                    infoWindow.open(map, this); // this is marker
                })
            });

        }).fail(function(err) {
            alert(err);
        }).always(function(){
            $('#ajax-loader').fadeOut();
        });

});