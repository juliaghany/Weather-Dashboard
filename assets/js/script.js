var APIkey = "0978a0ccf12949ddddf0e4973961fbc5";

var currentCity = $("#current-city-and-date");
const currentDay = dayjs();
var currentTemp = $("#current-temp");
var currentWind = $("#current-wind");
var currentHumidity = $("#current-humidity");
var currentDayIcon = $("#current-day-icon");

var dayOneTemp = $("#day-1-temp");
var dayOneWind = $("#day-1-wind");
var dayOneHumidity = $("#day-1-humidity");
var dayOneIcon = $("#day-1-icon");
var dayOneDate = $("#day-1-date")
var dateOne = currentDay.add(1, "day");

var dayTwoTemp = $("#day-2-temp");
var dayTwoWind = $("#day-2-wind");
var dayTwoHumidity = $("#day-2-humidity");
var dayTwoIcon = $("#day-2-icon");
var dayTwoDate = $("#day-2-date");
var dateTwo = currentDay.add(2, "day");

var dayThreeTemp = $("#day-3-temp");
var dayThreeWind = $("#day-3-wind");
var dayThreeHumidity = $("#day-3-humidity");
var dayThreeIcon = $("#day-3-icon");
var dayThreeDate = $("#day-3-date");
var dateThree = currentDay.add(3, "day");

var dayFourTemp = $("#day-4-temp");
var dayFourWind = $("#day-4-wind");
var dayFourHumidity = $("#day-4-humidity");
var dayFourIcon = $("#day-4-icon");
var dayFourDate = $("#day-4-date");
var dateFour = currentDay.add(4, "day");

var dayFiveTemp = $("#day-5-temp");
var dayFiveWind = $("#day-5-wind");
var dayFiveHumidity = $("#day-5-humidity");
var dayFiveIcon = $("#day-5-icon");
var dayFiveDate = $("#day-5-date");
var dateFive = currentDay.add(5, "day");

var submitBtn = $("#submit");
var userInput = $(".user-input");


function handleFormSubmit(event) {
    event.preventDefault();
    var city = userInput.val()
    if (city) {
        getWeather(city);
    }

};

function getWeather(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            currentCity.text(data.name + currentDay.format(" MM/DD/YY "));
            currentDayIcon.attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")

            currentTemp.text("Temp: " + data.main.temp + " °F");
            currentWind.text("Wind: " + data.wind.speed + " MPH");
            currentHumidity.text("Humidity: " + data.main.humidity + "%");

            var newRequestURL = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + APIkey;
            fetch(newRequestURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    dayOneDate.text(dateOne.format("MM/DD/YY"));
                    dayOneIcon.attr("src", "https://openweathermap.org/img/wn/" + data.list[7].weather[0].icon + "@2x.png");
                    dayOneTemp.text("Temp: " + data.list[7].main.temp + " °F");
                    dayOneWind.text("Wind: " + data.list[7].wind.speed + " MPH");
                    dayOneHumidity.text("Humidity: " + data.list[7].main.humidity + "%");

                    dayTwoDate.text(dateTwo.format("MM/DD/YY"));
                    dayTwoIcon.attr("src", "https://openweathermap.org/img/wn/" + data.list[15].weather[0].icon + "@2x.png");
                    dayTwoTemp.text("Temp: " + data.list[15].main.temp + " °F");
                    dayTwoWind.text("Wind: " + data.list[15].wind.speed + " MPH");
                    dayTwoHumidity.text("Humidity: " + data.list[15].main.humidity + "%");

                    dayThreeDate.text(dateThree.format("MM/DD/YY"));
                    dayThreeIcon.attr("src", "https://openweathermap.org/img/wn/" + data.list[22].weather[0].icon + "@2x.png");
                    dayThreeTemp.text("Temp: " + data.list[22].main.temp + " °F");
                    dayThreeWind.text("Wind: " + data.list[22].wind.speed + " MPH");
                    dayThreeHumidity.text("Humidity: " + data.list[22].main.humidity + "%");

                    dayFourDate.text(dateFour.format("MM/DD/YY"));
                    dayFourIcon.attr("src", "https://openweathermap.org/img/wn/" + data.list[30].weather[0].icon + "@2x.png");
                    dayFourTemp.text("Temp: " + data.list[30].main.temp + " °F");
                    dayFourWind.text("Wind: " + data.list[30].wind.speed + " MPH");
                    dayFourHumidity.text("Humidity: " + data.list[30].main.humidity + "%");

                    dayFiveDate.text(dateFive.format("MM/DD/YY"));
                    dayFiveIcon.attr("src", "https://openweathermap.org/img/wn/" + data.list[38].weather[0].icon + "@2x.png");
                    dayFiveTemp.text("Temp: " + data.list[38].main.temp + " °F");
                    dayFiveWind.text("Wind: " + data.list[38].wind.speed + " MPH");
                    dayFiveHumidity.text("Humidity: " + data.list[38].main.humidity + "%");


                })

        });

};



function displaySearchHistory() {
    var searchHistory = $("#search-history");
    var pastCity = $("<button>");
    pastCity.attr("class", "btn past-search-btn");
    pastCity.text(localStorage.getItem("city"));
    searchHistory.append(pastCity);

    $("#search-history").on("click", function (event) {
        var target = event.target
        if (target.matches(".past-search-btn")) {
            
        }
    });
}

submitBtn.on("click", handleFormSubmit);

submitBtn.on("click", function () {
    var searchedCity = userInput.val();
    localStorage.setItem("city", searchedCity);
    displaySearchHistory();
});

