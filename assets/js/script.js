// hook into elements
// submit button function
// get data from city search
// onclick call first api call and store in local storage
// add searched city to history
// function for api call to get weather data
// extract data and coordinates

// add data to top right container
// function for api call to get uv index from coordinate
// function for  api call to get five day forecast
// when history button is clicked call all 3 api functions


// hold list of cities searched
let cities = [];
let searchedCity = "";
const apiKey = "46f263eda7f39c71ab13a43ad05a47d0"

// when magnify button is clicked to search a NEW city 
$("#submitCity").on("click", function(event) {
    event.preventDefault();
    // grab value from textbox
    searchedCity = $("#location").val().trim();
    // city from the textbox is then added to the array
    cities.push(searchedCity);
    //first api call
    getWeather();

  });


function getWeather() {
    // create url
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchedCity +"&APPID=46f263eda7f39c71ab13a43ad05a47d0";
    // Creates AJAX call for the specific movie button being clicked

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        let temp = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2);
        let humidity = response.main.humidity;
        let windSpeed = response.wind.speed;
        let lat =  response.coord.lat;
        let long = response.coord.lon;

    });
  
}





