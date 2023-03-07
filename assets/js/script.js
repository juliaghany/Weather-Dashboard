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

// function that handles load storage, adds buttons to search history as user searches for a city

function loadStorage() {
    var pastSearches = JSON.parse(localStorage.getItem("searched-cities"));
    if (!pastSearches) {
        localStorage.setItem("searched-cities", JSON.stringify([]))
        return
    }

    var searchHistory = $("#search-history");

    searchHistory.empty()

    for (let i = 0; i < pastSearches.length; i++) {
        var pastCity = $("<button>");
        pastCity.attr("class", "btn past-search-btn");
        pastCity.text(pastSearches[i]);
        searchHistory.append(pastCity)
    }
}

// function that saves new searches to local storage and calls loads storage 

function saveToStorage(newCity) {
    var pastSearches = JSON.parse(localStorage.getItem("searched-cities"))
    if (pastSearches.includes(newCity)) { return }
    pastSearches.push(newCity)
    if (pastSearches.length > 5) {
        pastSearches.shift()
    }
    localStorage.setItem("searched-cities", JSON.stringify(pastSearches))
    loadStorage()
}

// function that gets weather data from api and displays current weather and future weather on the page

function getWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            saveToStorage(data.name)
            currentCity.text(data.name + currentDay.format(" MM/DD/YY "));
            currentDayIcon.attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")

            currentTemp.text("Temp: " + data.main.temp + " °F");
            currentWind.text("Wind: " + data.wind.speed + " MPH");
            currentHumidity.text("Humidity: " + data.main.humidity + "%");

            var newRequestURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + APIkey;
            fetch(newRequestURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    // ensures weather data is presented for 3pm for each day in the future forecast

                    var startingIndex;

                    for (let i = 0; i < data.list.length; i++) {
                        console.log(data.list[i].dt_txt.split(" ")[1])
                        if (data.list[i].dt_txt.split(" ")[1] == "15:00:00") {
                            startingIndex = i
                            break
                        }
                    }

                    // for loop to dynamically format the future forecast divs

                    const futureForecastElement = document.getElementById("future")
                    futureForecastElement.innerHTML = ""
                    let day = 1
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

// function that ensures the user is clicking on a search history button, if/when they do it calls the getWeather function to show the weather for 
// the city they selected

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

// event listener for searh button, clears input field after clicking

submitBtn.on("click", function () {
    $(".user-input").val('')
});

// event listener for search history buttons

searchHistoryContainer.on('click', handleSearchHistoryClick);

loadStorage();