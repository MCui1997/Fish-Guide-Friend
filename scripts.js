//Initialize variables in the global scope
var latVal = 0;
var lngVal = 0;
var map;
var marker;

//If the search button is clicked for zipcode
$("#searchBtn").on("click",function(){

    var zipcode = $("#ziptext").val();
    getZip(zipcode);
})

// Function to get the map, should be bassed off of input zip code or city
function initMap() {
    // The location of city
    var city = {lat: latVal, lng: lngVal};

    // The map, centered at city
    map = new google.maps.Map(
    document.getElementById('map'), {zoom: 10, center: city});
    // The marker, positioned at city
    var marker = new google.maps.Marker({position: city, map: map});

    map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
      });
    
  }

 
// Function to turn the zipcode into coordinates and then update map 
function getZip(zipcode) {

 var url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB0vQ09dYxrc89pwXaL5xzOQfVCjQq32W8&components=postal_code:"+zipcode;
    
    
    //Only proceed forward if it is a valid city

      //Fetch the data from the website
      fetch(url)
        .then(function(response) {
        
        //Only proceed if valid city
        if (response.ok) {
            
            $.ajax({
                url: url,
                method: "GET"
              }).then(function(response) {
                    
                    latVal = response.results[0].geometry.location.lat;
                    lngVal = response.results[0].geometry.location.lng;
                    
                    
                    //Updates the map with the right coordinates
                    map.setCenter({lat: latVal, lng: lngVal}); 
                    

              });

            }

            else{
                alert("error");
            }
        });
    
    }

//Allows the user to place a marker and pans there
function placeMarkerAndPanTo(latLng, map) {
        
    if (marker){
      marker.setPosition(latLng)
    } else{

      marker = new google.maps.Marker({
        position: latLng,
        map: map

    });
  }
    
      latVal = marker.getPosition().lat();
      lngVal = marker.getPosition().lng();
      map.panTo(latLng);

      getWeather(latVal,lngVal);
}

// Function to update the weather when you click on the map
function getWeather(latVal,lngVal){

  var url = "https://api.openweathermap.org/data/2.5/onecall?lat="+latVal+"&lon="+lngVal+"&exclude=minutely&appid=d2473db2d15b3f33089244526bb7a7b6";
    
    
  //Only proceed forward if it is a valid city



    //Fetch the data from the website
    fetch(url)
      .then(function(response) {
      
      //Only proceed if valid city
      if (response.ok) {
          
          $.ajax({
              url: url,
              method: "GET"
            }).then(function(response) {

              //Get values from JSON data
              var tempKelvin = response.current.temp;
              var humidity = response.current.humidity;
              var wind = response.current.wind_speed;
              var uv = response.current.uvi;


              //Convert kelvings to celsius, then finally fahrenheit
              var tempCelsius = tempKelvin - 273;
              var tempFahrenheit = (tempCelsius * (9/5)) + 32;

              //Display values to the screen
              $("#tempLabel").text(Math.round(tempFahrenheit)+"°F");
              $("#humidLabel").text(Math.round(humidity)+"%");
              $("#windLabel").text(wind+" MPH");
              $("#uvLabel").text(uv);
              

            });

        }

      });

    }