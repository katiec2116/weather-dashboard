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
let searchedCity = "Orlando";
const apiKey = "46f263eda7f39c71ab13a43ad05a47d0"

onLoad();



function onLoad(){
    $(".list-group").prepend($("<li>").text(searchedCity).addClass("list-group-item"));
    getWeather();
}


// when magnify button is clicked to search a NEW city 
$("#submitCity").on("click", function(event) {
    event.preventDefault();
    // grab value from textbox
    searchedCity = $("#location").val().trim();
    // city from the textbox is then added to the array
    cities.push(searchedCity);
    // add city to search history lost
    $(".list-group").prepend($("<li>").text(searchedCity).addClass("list-group-item"));
    //first api call
    getWeather();

  });


function getWeather() {
    // create url
    let weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchedCity +"&APPID=46f263eda7f39c71ab13a43ad05a47d0";
    // Creates AJAX call for the specific movie button being clicked

    $.ajax({
      url: weatherURL,
      method: "GET"
    }).then(function(weather) {
        let temp = ((weather.main.temp - 273.15) * 1.80 + 32).toFixed(1);
        let humidity = weather.main.humidity;
        let windSpeed = weather.wind.speed;
        let lat =  weather.coord.lat;
        let long = weather.coord.lon;

        let icon = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"
        let iconPic = $('<img src="'+ icon +'">').addClass("align-bottom");



        // clear out current weather div
        $("#currentWeather").empty();
        // get date
        let now = " ("+ moment().format('l')+ ")";
        // add city name and date to the page
        $("#currentWeather").append($("<h3>").text(searchedCity + now).addClass("cityName"));
        // add icon 
        $(".cityName").append($(iconPic));
        // $(".cityName").append.(iconPic);

        // add current weather data to the page
        $("#currentWeather").append($("<p>").text("Temperature: " + temp + " °F"));
        $("#currentWeather").append($("<p>").text("Humidity: " + humidity + "%"));
        $("#currentWeather").append($("<p>").text("Wind Speed: " + windSpeed + " MPH"));
  

    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?&APPID=46f263eda7f39c71ab13a43ad05a47d0&lat=" + lat + "&lon=" + long;

    $.ajax({
        url: uvURL,
        method: "GET"
      }).then(function(uv) {
        let uvIndex = uv.value;

        $("#currentWeather").append($("<p>").text("UV Index: ").addClass("uv"));
        $(".uv").append($("<button>").text(uvIndex).addClass("btn btn-danger"));


        });

    });
}





