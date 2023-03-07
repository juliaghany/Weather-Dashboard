// assign variable for API key

var APIkey = "0978a0ccf12949ddddf0e4973961fbc5";

// assign variables for current day container and contents

var currentCity = $("#current-city-and-date");
const currentDay = dayjs();
var currentTemp = $("#current-temp");
var currentWind = $("#current-wind");
var currentHumidity = $("#current-humidity");
var currentDayIcon = $("#current-day-icon");



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
                    var startingIndex;
                    for (let i = 0; data.list.length; i++) {
                        console.log(data.list[i].dt_txt.split(" ")[1])
                        if (data.list[i].dt_txt.split(" ")[1] == "15:00:00") {
                            startingIndex = i
                            break
                        }
                    }
                    const futureForecastElement = document.getElementById("future")
                    futureForecastElement.innerHTML = ""
                    let day = 1
                    console.log(startingIndex)
                    for (let i = startingIndex; i < data.list.length; i += 8) {
                        var currentDate = currentDay.add(day, "day");
                        futureForecastElement.innerHTML += ` <div class="col-12 col-lg-2">
                        <p>${currentDate.format("MM/DD/YY")}</p>
                        <img src=${"https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"} class="future-icon">
                            <p>Temp: ${data.list[i].main.temp + " °F"}</p>
                            <p>Wind: ${data.list[i].wind.speed + " MPH"}</p>
                            <p>Humidity: ${data.list[i].main.humidity + "%"}</p>
                    </div>`
                        day++
                    }

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

// event listener that displays search history once the user searches for a city 

submitBtn.on("click", function () {
    var searchedCity = userInput.val();
    localStorage.setItem("city", searchedCity);
    displaySearchHistory();
    $(".user-input").val('')
});

// event listener for search history buttons

searchHistoryContainer.on('click', handleSearchHistoryClick);


var first = "Julia"
var last = "Hany"
console.log(`${first} ${last}`)