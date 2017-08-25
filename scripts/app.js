// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  function template(url) {
      return `
      <div id="info">
        <p>M 4.2 - 1km ESE of Fontana, California / 123 hours ago </p>
        <p>M 3.1 - 6km SSW of Columbus, Ohio / 77 hours ago </p>
      </div>
      `;
  }
  var $info = $("#info");
  $.ajax({
      type: "GET",
      url: weekly_quakes_endpoint
  })
  .then(function(data) { //promise chain
    var map = new google.maps.Map($("#map")[0], {
              zoom: 2,
              center: {
                lat: 37.78,
                lng: -122.44
              }
    });
      data.features.forEach(function(feature) {
        //extract title and template it out to info

        var title = feature.properties.title;
        var titleHtml = `<div>${title}</div>`;
        $info.append(titleHtml);

        //extract lat and log and place markers on google map
        new google.maps.Marker({
          position: {
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0]
          },
          map: map,
          title: title
        });
      });
      console.log(data);
  })
  .catch(function(err) {
      console.log(err);
  });


});
