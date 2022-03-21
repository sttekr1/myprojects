console.log("connected");

let myKey = `0510925fa7f2865565c18f592fb86a66`;

let homeWeather = document.getElementById("homeWeather");
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchBtn");
let cityInfo = document.getElementById("cityInfo");
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let resultsCards = document.getElementsByClassName("card");

function getWeatherInfo(cityInput) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=metric&APPID=${myKey}`;
    $.ajax({
        url: apiUrl,
        success: function (response) {
            console.log("Success", response);
            getCityInfo(response, cityInfo);
            getTemperatrue(response, temperature);
            getHumidity(response, humidity);
        },
        error: function (error) {
            console.log(error);
        }
    })
};

function getCityInfo(cityApi, element) {
    let weatherIcon = cityApi.list[0].weather[0].icon;
    let description = cityApi.list[0].weather[0].description;
    element.innerHTML = "";
    element.innerHTML += `
    <h5 class="card-title cityName">${cityApi.city.name} <img src="http://openweathermap.org/img/w/${weatherIcon}.png"</h5>
    <p class="card-text currentTemp">Current Temperature: ${cityApi.list[0].main.temp} C° (${description})</p>
    <p class="card-text feelsLike">Feels like: ${cityApi.list[0].main.feels_like} C°</p>`
};

function getTemperatrue(cityApi, element) {
    element.innerHTML = "";
    let minTemp = 100;
    let maxTemp = 0;
    let avgTemp = 0;
    for (let i = 0; i < cityApi.list.length; i++) {
        avgTemp += (cityApi.list[i].main.temp);
        if (cityApi.list[i].main.temp_max > maxTemp) {
            maxTemp = cityApi.list[i].main.temp_max;
        }
        if (cityApi.list[i].main.temp_min < minTemp) {
            minTemp = cityApi.list[i].main.temp_min;
        }
    } return element.innerHTML += `
        <li class="list-group-item">Average Temperature: ${avgTemp / cityApi.list.length} C°</li>
        <li class="list-group-item">Max. Temperature: ${maxTemp} C°</li>
        <li class="list-group-item">Min. Temperature: ${minTemp} C°</li>`
};

function getHumidity(cityApi, element) {
    element.innerHTML = "";
    let minHumidity = 100;
    let maxHumidity = 0;
    let avgHumidity = 0;
    for (let i = 0; i < cityApi.list.length; i++) {
        avgHumidity += (cityApi.list[i].main.humidity);
        if (cityApi.list[i].main.humidity > maxHumidity) {
            maxHumidity = cityApi.list[i].main.humidity;
        }
        if (cityApi.list[i].main.humidity < minHumidity) {
            minHumidity = cityApi.list[i].main.humidity;
        }
    } return element.innerHTML += `
        <li class="list-group-item avgHum">Average Humidity: ${avgHumidity / cityApi.list.length} %</li>
        <li class="list-group-item maxHum">Max. Humidity: ${maxHumidity} %</li>
        <li class="list-group-item minHum">Min. Humidity: ${minHumidity} %</li>`
};

searchButton.addEventListener("click", function (e) {
    if (searchInput.value != "") {
        e.preventDefault();
        getWeatherInfo(searchInput.value);
        getHourlyInfo(searchInput.value);
        searchInput.value = '';
        resultsCards[0].style.display = "block";
        resultsCards[1].style.display = "none";
        resultsCards[2].style.display = "none";
    } else {
        alert("Please input a city");
    }
});
// Hourly Weather
let cityHourlyInfo = document.getElementById("cityHourlyInfo");
let hourlyTemperature = document.getElementById("hourlyTemperature");
let homeBtn = document.getElementById("homeBtn");
let hourlyBtn = document.getElementById("hourlyBtn");
let aboutBtn = document.getElementById("AboutBtn");
let logoBtn = document.getElementsByClassName("navbar-brand");

function getHourlyInfo(cityInput) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=metric&APPID=${myKey}`;
    $.ajax({
        url: apiUrl,
        success: function (response) {
            console.log("Success", response);
            getCityInfo(response, cityHourlyInfo);
            printHourlyWeather(response, hourlyTemperature);
        },
        error: function (error) {
            console.log(error);
        }
    })
};

function printHourlyWeather(cityApi, element) {
    element.innerHTML = "";
    for (let i = 0; i < cityApi.list.length; i++) {
        element.innerHTML += `
        <li class="list-group-item">${cityApi.list[i].dt_txt} <img src="http://openweathermap.org/img/w/${cityApi.list[i].weather[0].icon}.png"</img>| Temperature: ${cityApi.list[i].main.temp} C°| Humidity: ${cityApi.list[i].main.humidity} %| Wind Speed: ${cityApi.list[i].wind.speed}km/h</li>`;
    }
};

hourlyBtn.addEventListener("click", function () {
    resultsCards[0].style.display = "none";
    resultsCards[1].style.display = "block";
    resultsCards[2].style.display = "none";
});

homeBtn.addEventListener("click", function () {
    resultsCards[0].style.display = "block";
    resultsCards[1].style.display = "none";
    resultsCards[2].style.display = "none";
});

aboutBtn.addEventListener("click", function () {
    resultsCards[0].style.display = "none";
    resultsCards[1].style.display = "none";
    resultsCards[2].style.display = "block";
});

logoBtn[0].addEventListener("click", function () {
    resultsCards[0].style.display = "block";
    resultsCards[1].style.display = "none";
    resultsCards[2].style.display = "block";
});