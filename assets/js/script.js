// assign variable for API key

var APIkey = "0978a0ccf12949ddddf0e4973961fbc5";

// assign variables for current day container and contents

var currentCity = $("#current-city-and-date");
const currentDay = dayjs();
var currentTemp = $("#current-temp");
var currentWind = $("#current-wind");
var currentHumidity = $("#current-humidity");
var currentDayIcon = $("#current-day-icon");

// assign variables for day one of future forecast

var dayOneTemp = $("#day-1-temp");
var dayOneWind = $("#day-1-wind");
var dayOneHumidity = $("#day-1-humidity");
var dayOneIcon = $("#day-1-icon");
var dayOneDate = $("#day-1-date")
var dateOne = currentDay.add(1, "day");

// assign variables for day two of future forecast

var dayTwoTemp = $("#day-2-temp");
var dayTwoWind = $("#day-2-wind");
var dayTwoHumidity = $("#day-2-humidity");
var dayTwoIcon = $("#day-2-icon");
var dayTwoDate = $("#day-2-date");
var dateTwo = currentDay.add(2, "day");

// assign variables for day three of future forecast

var dayThreeTemp = $("#day-3-temp");
var dayThreeWind = $("#day-3-wind");
var dayThreeHumidity = $("#day-3-humidity");
var dayThreeIcon = $("#day-3-icon");
var dayThreeDate = $("#day-3-date");
var dateThree = currentDay.add(3, "day");

// assign variables for day four of future forecast

var dayFourTemp = $("#day-4-temp");
var dayFourWind = $("#day-4-wind");
var dayFourHumidity = $("#day-4-humidity");
var dayFourIcon = $("#day-4-icon");
var dayFourDate = $("#day-4-date");
var dateFour = currentDay.add(4, "day");

// assign variables for day five of future forecast

var dayFiveTemp = $("#day-5-temp");
var dayFiveWind = $("#day-5-wind");
var dayFiveHumidity = $("#day-5-humidity");
var dayFiveIcon = $("#day-5-icon");
var dayFiveDate = $("#day-5-date");
var dateFive = currentDay.add(5, "day");

// assign variable for submit button, user input field, and search history container 

var submitBtn = $("#submit");
var userInput = $(".user-input");
const searchHistoryContainer = $('#search-history')

// function that handles the form submit

function handleFormSubmit(event) {
    event.preventDefault();
    var city = userInput.val().trim()
    if (city) {
        getWeather(city);
    }

};

// function that gets weather data from api and displays current weather and future weather on the page

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
                    console.log(data);

                    dayOneDate.text(dateOne.format("MM/DD/YY"));
                    dayOneIcon.attr("src", "https://openweathermap.org/img/wn/" + data.list[5].weather[0].icon + "@2x.png");
                    dayOneTemp.text("Temp: " + data.list[5].main.temp + " °F");
                    dayOneWind.text("Wind: " + data.list[5].wind.speed + " MPH");
                    dayOneHumidity.text("Humidity: " + data.list[5].main.humidity + "%");

                    dayTwoDate.text(dateTwo.format("MM/DD/YY"));
                    dayTwoIcon.attr("src", "https://openweathermap.org/img/wn/" + data.list[15].weather[0].icon + "@2x.png");
                    dayTwoTemp.text("Temp: " + data.list[13].main.temp + " °F");
                    dayTwoWind.text("Wind: " + data.list[13].wind.speed + " MPH");
                    dayTwoHumidity.text("Humidity: " + data.list[13].main.humidity + "%");

                    dayThreeDate.text(dateThree.format("MM/DD/YY"));
                    dayThreeIcon.attr("src", "https://openweathermap.org/img/wn/" + data.list[23].weather[0].icon + "@2x.png");
                    dayThreeTemp.text("Temp: " + data.list[21].main.temp + " °F");
                    dayThreeWind.text("Wind: " + data.list[21].wind.speed + " MPH");
                    dayThreeHumidity.text("Humidity: " + data.list[21].main.humidity + "%");

                    dayFourDate.text(dateFour.format("MM/DD/YY"));
                    dayFourIcon.attr("src", "https://openweathermap.org/img/wn/" + data.list[29].weather[0].icon + "@2x.png");
                    dayFourTemp.text("Temp: " + data.list[29].main.temp + " °F");
                    dayFourWind.text("Wind: " + data.list[29].wind.speed + " MPH");
                    dayFourHumidity.text("Humidity: " + data.list[31].main.humidity + "%");

                    dayFiveDate.text(dateFive.format("MM/DD/YY"));
                    dayFiveIcon.attr("src", "https://openweathermap.org/img/wn/" + data.list[37].weather[0].icon + "@2x.png");
                    dayFiveTemp.text("Temp: " + data.list[37].main.temp + " °F");
                    dayFiveWind.text("Wind: " + data.list[37].wind.speed + " MPH");
                    dayFiveHumidity.text("Humidity: " + data.list[37].main.humidity + "%");


                })

        });

};

// function that creates the search history button for each city that the user searches  

function displaySearchHistory() {
    var searchHistory = $("#search-history");
    var pastCity = $("<button>");
    pastCity.attr("class", "btn past-search-btn");
    pastCity.text(localStorage.getItem("city"));
    searchHistory.append(pastCity);
}

// function that ensures the user is clicking on a search history button, if/when they do it calls the getWeather function to show the weather for the city they selected

function handleSearchHistoryClick(event) {
    if (!event.target.matches('.past-search-btn')) {
        return;
    }

    var btn = event.target;
    var city = btn.innerHTML

    getWeather(city)

}

// add event listeners

// event listener for form submission 

submitBtn.on("click", handleFormSubmit);

// even listener that displays search history once the user searches for a city 

submitBtn.on("click", function () {
    var searchedCity = userInput.val();
    localStorage.setItem("city", searchedCity);
    displaySearchHistory();
    $(".user-input").val('')
});

// event listener for search history buttons

searchHistoryContainer.on('click', handleSearchHistoryClick);
