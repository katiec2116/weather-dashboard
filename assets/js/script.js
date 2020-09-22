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
let lat;
let long;
let temp;
let humidity;
let windSpeed;

onLoad();



function onLoad() {
    getCity();
    searchedCity = cities[cities.length - 1];
    // $(".list-group").prepend($("<li>").text(searchedCity).addClass("list-group-item"));
    getWeather();
}


// when magnify button is clicked to search a NEW city 
$("#submitCity").on("click", function (event) {
    event.preventDefault();
    // grab value from textbox
    searchedCity = $("#location").val().trim();
    searchedCity = searchedCity.charAt(0).toUpperCase() + searchedCity.substr(1);
    // city from the textbox is then added to the array
    cities.push(searchedCity);
    // add city to search history lost
    $(".list-group").prepend($("<button>").text(searchedCity).addClass("list-group-item btn text-left"));
    //first api call
    saveCity();
    getWeather();

});


function getWeather() {
    // create url
    let weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&APPID=46f263eda7f39c71ab13a43ad05a47d0";
    // Creates AJAX call for the specific movie button being clicked

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (weather) {
        temp = ((weather.main.temp - 273.15) * 1.80 + 32).toFixed(1);
        humidity = weather.main.humidity;
        windSpeed = weather.wind.speed;
        lat = weather.coord.lat;
        long = weather.coord.lon;

        let icon = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"
        let iconPic = $('<img src="' + icon + '">').addClass("align-bottom");



        // clear out current weather div
        $("#currentWeather").empty();
        // get date
        let now = " (" + moment().format('l') + ")";
        // add city name and date to the page
        $("#currentWeather").append($("<h3>").text(searchedCity + now).addClass("cityName"));
        // add icon 
        $(".cityName").append($(iconPic));
        // add current weather data to the page
        $("#currentWeather").append($("<p>").text("Temperature: " + temp + " °F").addClass("mt-4"));
        $("#currentWeather").append($("<p>").text("Humidity: " + humidity + "%").addClass("mt-4"));
        $("#currentWeather").append($("<p>").text("Wind Speed: " + windSpeed + " MPH").addClass("mt-4"));


        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?&APPID=46f263eda7f39c71ab13a43ad05a47d0&lat=" + lat + "&lon=" + long;

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (uv) {
            let uvIndex = uv.value;

            $("#currentWeather").append($("<p>").text("UV Index: ").addClass("uv mt-4"));
            $(".uv").append($("<button>").text(uvIndex).addClass("uv-color btn btn-sm"));

            if (uvIndex < 3) {
                $(".uv-color").addClass("green text-white");
            }
            else if (uvIndex < 6) {
                $(".uv-color").addClass("yellow text-muted");
            }
            else if (uvIndex < 8) {
                $(".uv-color").addClass("orange text-white");
            }
            else if (uvIndex < 11) {
                $(".uv-color").addClass("red text-white");
            }
            else if (uvIndex >= 11) {
                $(".uv-color").addClass("purple text-white");
            }

            let forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=hourly,minutely,alerts&appid=46f263eda7f39c71ab13a43ad05a47d0";

            // Creates AJAX call for the specific movie button being clicked

            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function (forecast) {
                $(".forecastRow").empty();
                for (var i = 1; i < 6; i++) {
                    // create values to show in forecast cards
                    let col = $("<div>").addClass("col forceast");
                    let card = $("<div>").addClass("card-body rightSide forecast bg-primary rounded text-white");
                    // creat time element and convert 
                    let time = $("<p>").addClass("mb-2").text(moment.unix(forecast.daily[i].dt).format("M/DD/YYYY"));
                    // populate elements with data for each day
                    let icon = "http://openweathermap.org/img/wn/" + forecast.daily[i].weather[0].icon + "@2x.png"
                    let iconPic = $('<img src="' + icon + '">');
                    // calculate temp
                    temp = ((forecast.daily[i].temp.day - 273.15) * 1.80 + 32).toFixed(1);
                    humidity = forecast.daily[i].humidity;
            

                    // append elements to the card
                    $(".forecastRow").append(col);
                    col.append(card);
                    card.append(time);
                    card.append(iconPic);
                    card.append($("<p>").text("Temp: " + temp + " °F").addClass("mt-2"));
                    card.append($("<p>").text("Humidity: " + humidity + "%").addClass("mt-3"));

                }

            });

        });

    });
}







function saveCity() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

function getCity() {
    if (localStorage.getItem("cities") != null) {

        cities = JSON.parse(localStorage.getItem("cities"));
        console.log(cities)
        cities.forEach(city => {
            $(".list-group").prepend($("<button>").text(city).addClass("list-group-item btn text-left"));
        })
    }


}


