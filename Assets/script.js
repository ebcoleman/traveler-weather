
var weatherAPI = "c2e41c2ad6868f94e2bbd03e123c92b8";
var cityInput = document.getElementById("cityInput");
var searchButton = document.getElementById("searchButton");
var searchResults = document.getElementById("searchResults");
var currentWeather = document.getElementById("currentWeather");
var forecast = document.getElementById("forecast");

var weatherData = [];

function updateWeatherData() {
    // Clear previous search results
    searchResults.innerHTML = "";
    currentWeather.innerHTML = "";
    forecast.innerHTML = "";

    // Update search results
    weatherData.forEach(function (weather) {
        var cityElement = document.createElement("li");
        cityElement.textContent = weather.city;
        searchResults.appendChild(cityElement);
    });

    // Update current weather
    if (weatherData.length > 0) {
        var currentWeatherData = weatherData[0]; // Assuming the first element is the current weather
        var currentWeatherInfo = document.createElement("div");

        var cityElement = document.createElement("h2");
        cityElement.textContent = currentWeatherData.city;
        currentWeatherInfo.appendChild(cityElement);

        var temperatureElement = document.createElement("p");
        temperatureElement.textContent = "Temperature: " + currentWeatherData.temperature + " degrees";
        currentWeatherInfo.appendChild(temperatureElement);

        var windSpeedElement = document.createElement("p");
        windSpeedElement.textContent = "Wind Speed: " + currentWeatherData.windSpeed + " mph";
        currentWeatherInfo.appendChild(windSpeedElement);

        var humidityElement = document.createElement("p");
        humidityElement.textContent = "Humidity: " + currentWeatherData.humidity;
        currentWeatherInfo.appendChild(humidityElement);

        currentWeather.appendChild(currentWeatherInfo);
    }

    // Update forecast
    for (var i = 1; i < weatherData.length; i++) {
        var forecastData = weatherData[i];
        var forecastInfo = document.createElement("div");

        // Create forecast elements and append them to forecastInfo

        forecast.appendChild(forecastInfo);
    }
}

// SEARCH BUTTON - click
searchButton.addEventListener("click", function () {
    var city = cityInput.value;

    // using the fetch function to pull the information from the API
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPI}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            // Shows data for the city user searched
            console.log(data);

            fetchWeatherData(city);
        })
        .catch(error => {
            console.log(error);
            // Handle errors (e.g., display an error message to the user)
        });
});

function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPI}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            var cityName = data.city.name;
            var humidity = data.list[0].main.humidity;
            var temperature = data.list[0].main.temp;
            var windSpeed = data.list[0].wind.speed;

            var currentWeatherInfo = {
                city: cityName,
                humidity: humidity,
                windSpeed: windSpeed,
                temperature: temperature,
            };

            weatherData.unshift(currentWeatherInfo); // Add current weather at the beginning

            // Handle forecast data
            for (var i = 1; i < 6; i++) {
                var forecastItem = data.list[i];
                // Extract forecast information and add it to weatherData
                weatherData.push({
                    // Populate forecast data properties
                });
            }

            updateWeatherData();
        })
        .catch(error => {
            console.log("Error fetching weather data", error);
            // Handle errors (e.g., display an error message to the user)
        });
}