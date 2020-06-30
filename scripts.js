//Initialize variables in the global scope
var latVal = 0;
var lngVal = 0;
var map;

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
    // // The marker, positioned at city
    // var marker = new google.maps.Marker({position: city, map: map});
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


 