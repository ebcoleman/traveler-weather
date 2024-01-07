
var weatherAPI = "c2e41c2ad6868f94e2bbd03e123c92b8";
var cityInput = document.getElementById("cityInput");
var searchButton = document.getElementById("searchButton");
var searchResults = document.getElementById("searchResults");
var currentWeather = document.getElementById("currentWeather");
var forecast = document.getElementById("forecast");
var weatherData = [];
var searchHistory = [];


function updateWeatherData() {

    currentWeather.innerHTML = "";
    forecast.innerHTML = "";
   
    // Update current weather
    if (weatherData.length > 0) {
        var currentWeatherData = weatherData[0]; 
        
        var currentWeatherInfo = document.createElement("div");

        var cityElement = document.createElement("h2");
        cityElement.textContent = currentWeatherData.city;
        currentWeatherInfo.appendChild(cityElement);

        var weatherIconElement = document.createElement("img");
        weatherIconElement.src = `https://openweathermap.org/img/w/${currentWeatherData.weatherIcon}.png`;
        weatherIconElement.alt = "Weather Icon";
        currentWeatherInfo.appendChild(weatherIconElement);

        var dateElement = document.createElement("p");
        dateElement.textContent = currentWeatherData.date;
        currentWeatherInfo.appendChild(dateElement);

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
        var forecastDateElement = document.createElement("p");
        forecastDateElement.textContent = forecastData.date;
        forecastInfo.appendChild(forecastDateElement);

        var forecastIconElement = document.createElement("img");
        forecastIconElement.src = `https://openweathermap.org/img/w/${forecastData.weatherIcon}.png`;
        forecastIconElement.alt = "Weather Icon";
        forecastInfo.appendChild(forecastIconElement);

        var forecastTemperatureElement = document.createElement("p");
        forecastTemperatureElement.textContent = "Temperature: " + forecastData.temperature + " degrees";
        forecastInfo.appendChild(forecastTemperatureElement);

        var forecastWindElement = document.createElement("p");
        forecastWindElement.textContent = "Wind Speed: " + forecastData.wind + " mph";
        forecastInfo.appendChild(forecastWindElement);

        var forecastHumidityElement = document.createElement("p");
        forecastHumidityElement.textContent = "Humidity: " + forecastData.humidity;
        forecastInfo.appendChild(forecastHumidityElement);



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
            console.log(data);

            fetchWeatherData(city);
        })
        .catch(error => {
            console.log(error);
        });
});

function fetchWeatherData(city) {
    
    weatherData = [];

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPI}&units=imperial`)
        .then(response => response.json())
        .then(data => {
          
            var cityName = data.city.name;

            // Handles current weather data
            var currentWeatherItem = data.list[0];
            var currentWeatherInfo = {
                city: cityName,
                date: formatDate(new Date(currentWeatherItem.dt * 1000)),
                weatherIcon: currentWeatherItem.weather[0].icon,
                temperature: currentWeatherItem.main.temp,
                windSpeed: currentWeatherItem.wind.speed,
                humidity: currentWeatherItem.main.humidity,
            };
            weatherData.push(currentWeatherInfo);

            // Handles forecast data
            for (var i = 1; i < data.list.length; i += 8) { // Retrieve every 8th item for a 24-hour forecast
                var forecastItem = data.list[i];
                var forecastDate = new Date(forecastItem.dt * 1000);

                weatherData.push({
                    date: formatDate(forecastDate),
                    weatherIcon: forecastItem.weather[0].icon,
                    temperature: forecastItem.main.temp,
                    windSpeed: forecastItem.wind.speed,
                    humidity: forecastItem.main.humidity,
                });
            }

            if (!searchHistory.includes(city)) {
                searchHistory.push(city);
                updateSearchHistory();
            }
            
            updateWeatherData();
        })
        .catch(error => {
            console.log("Error fetching weather data", error);
        });
}


function updateSearchHistory() {
    searchResults.innerHTML = "";

    searchHistory.forEach(function (city) {
        var cityElement = document.createElement("li");
        cityElement.textContent = city;
        cityElement.addEventListener("click", function () {
            fetchWeatherData(city);
        });
        searchResults.appendChild(cityElement);
    });

    // Save search history to local storage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

function init() {
    // Load search history from local storage
    var storedSearchHistory = localStorage.getItem("searchHistory");
    
    if (storedSearchHistory) {
        searchHistory = JSON.parse(storedSearchHistory);
        updateSearchHistory();
    }
}

init();

function formatDate(date) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

