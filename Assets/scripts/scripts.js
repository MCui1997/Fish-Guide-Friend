//Initialize variables in the global scope
var latVal = 0;
var lngVal = 0;
var map;
var marker;

if(localStorage.length!=0){
  var zipcode = localStorage.getItem("zipcode");
  $("#businessName").empty();
  getZip(zipcode);
  getYelp(zipcode);
}

//If the search button is clicked for zipcode
$("#searchBtn").on("click",function(){

    var zipcode = $("#ziptext").val();

    if(zipcode.length != 5){
      return;
    }
    if (zipcode.match(/^[0-9]+$/) != null) { 

      localStorage.setItem("zipcode",zipcode);

      $("#businessName").empty();

      getZip(zipcode);
      getYelp(zipcode);
      
      $("#ziptext").val("");
    
      
    }


    
})

//if enter key is pressed
$('#ziptext').keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
      
      $("#searchBtn").click();
  }
});


// Function to get the map, should be bassed off of input zip code or city
function initMap() {
    // The location of city
    var city = {lat: latVal, lng: lngVal};

    // The map, centered at city
    map = new google.maps.Map(
    document.getElementById('map'), {zoom: 10, center: city});



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

              //Get values from JSON data of weather conditions
              var tempKelvin = response.current.temp;
              var humidity = response.current.humidity;
              var wind = response.current.wind_speed;
              var uv = response.current.uvi;

              var tempKelvin1 = response.daily[1].temp.day;
              var humidity1 = response.daily[1].humidity;
              var wind1 = response.daily[1].wind_speed;
              var uv1 = response.daily[1].uvi

              var tempKelvin2 = response.daily[2].temp.day;
              var humidity2 = response.daily[2].humidity;
              var wind2 = response.daily[2].wind_speed;
              var uv2 = response.daily[2].uvi

              var tempKelvin3 = response.daily[3].temp.day;
              var humidity3 = response.daily[3].humidity;
              var wind3 = response.daily[3].wind_speed;
              var uv3 = response.daily[3].uvi

              var tempKelvin4 = response.daily[4].temp.day;
              var humidity4 = response.daily[4].humidity;
              var wind4 = response.daily[4].wind_speed;
              var uv4 = response.daily[4].uvi

              date = [];
                     //Gets the dates and displays them
                     for (var i =0; i<5; i++){

                      j = i+1;
                      date[i] = response.daily[i].dt;
                      var day = moment.unix(date[i]);
                      $("#date"+j).text(moment(day).format("ddd"));
                      $("#date"+j).append(", "+moment(day).format("MMM DD"));
                  }


              //Convert kelvings to celsius, then finally fahrenheit
              var tempCelsius = tempKelvin - 273;
              var tempFahrenheit = (tempCelsius * (9/5)) + 32;

              var tempCelsius1 = tempKelvin1 - 273;
              var tempFahrenheit1 = (tempCelsius1 * (9/5)) + 32;

              var tempCelsius2 = tempKelvin2 - 273;
              var tempFahrenheit2 = (tempCelsius2 * (9/5)) + 32;

              var tempCelsius3 = tempKelvin3 - 273;
              var tempFahrenheit3 = (tempCelsius3 * (9/5)) + 32;

              var tempCelsius4 = tempKelvin4 - 273;
              var tempFahrenheit4 = (tempCelsius4 * (9/5)) + 32;

              //Display values to the screen
              $("#tempLabel").text(Math.round(tempFahrenheit)+"°F");
              $("#humidLabel").text(Math.round(humidity)+"%");
              $("#windLabel").text(wind+" MPH");
              $("#uvLabel").text(uv);
              
              $("#tempLabel1").text(Math.round(tempFahrenheit1)+"°F");
              $("#humidLabel1").text(Math.round(humidity1)+"%");
              $("#windLabel1").text(wind1+" MPH");
              $("#uvLabel1").text(uv1);
              
              $("#tempLabel2").text(Math.round(tempFahrenheit2)+"°F");
              $("#humidLabel2").text(Math.round(humidity2)+"%");
              $("#windLabel2").text(wind2+" MPH");
              $("#uvLabel2").text(uv2);

              $("#tempLabel3").text(Math.round(tempFahrenheit3)+"°F");
              $("#humidLabel3").text(Math.round(humidity3)+"%");
              $("#windLabel3").text(wind3+" MPH");
              $("#uvLabel3").text(uv3);
              
              $("#tempLabel4").text(Math.round(tempFahrenheit4)+"°F");
              $("#humidLabel4").text(Math.round(humidity4)+"%");
              $("#windLabel4").text(wind4+" MPH");
              $("#uvLabel4").text(uv4);

            });

        }

      });

    }

    //Function for yelp data
    function getYelp(zipcode){

     

      var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=fishing&location="+zipcode;

         $.ajax({
            url: myurl,
            headers: {
             'Authorization':'Bearer LZBc3MawxL6gYhmt6U-V4wywNl4PlpzLuP_oEdCfbEGKe_RkxmMcD7ynfbAk8Wut5jfDs-nMJEqOLQd88nuSkkIfz1dwmJYEIo20bC1bCfIbdmQ9w3fb9XpxCb76XnYx',
         },
            method: 'GET',
            dataType: 'json',
            success: function(data){
            
              
            
              // For loop to get all data values from businesses, can change how many businesses we want
              for (var i =0; i <5; i++){

                var name = data.businesses[i].name;
                var url = data.businesses[i].url;

                
                var lat = data.businesses[i].coordinates.latitude;
                var lng = data. businesses[i].coordinates.longitude;

                var businessLink =$('<a>',{
                  target: "_blank",
                  href: url,
                  style: "width: 100%; text-align:center;",
                  text: "Yelp",
                  id: "yelpLabel",
                });

             
                var businessBtn =$('<button>',{
                    
                    text: name,
                    style: "width: 100%",
                    id: "businessBtn",
                    value: lat,
                    name: lng,
                  
              });
                
                //Append everything to html
                $("#businessName").append(businessBtn);
                $("#businessName").append(businessLink);
                $("#businessName").append("<br>");
                $("#businessName").append("<br>");

              
              }

    }
  });
}

//If the yelp business button is clicked, map will update with marker and go over there
$(document).on("click","#businessBtn", function(){



  latVal = parseFloat(this.value);
  lngVal = parseFloat(this.name);


  //Updates the map with the right coordinates
  map.setCenter({lat: latVal, lng: lngVal}); 
  getWeather(latVal,lngVal);

  var location = {lat:latVal, lng:lngVal}

  let marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    }
  });


});