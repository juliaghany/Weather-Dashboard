fetch("https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0978a0ccf12949ddddf0e4973961fbc5")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
    })


