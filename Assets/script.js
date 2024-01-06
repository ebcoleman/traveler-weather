var weatherAPI = "c2e41c2ad6868f94e2bbd03e123c92b8";
var cityInput = document.getElementById("cityInput");
var searchButton = document.getElementById("searchButton");
var searchResults = document.getElementById("searchResults");
var currentWeather = document.getElementById("currentWeather");
var forecast = document.getElementById("forecast");

// SEARCH BUTTON - click
searchButton.addEventListener("click", function() {
console.log("clicked search");
    var city = cityInput.value;
    console.log("City input: " + city);

    // using the fetch function to pull the information from the API
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c2e41c2ad6868f94e2bbd03e123c92b8`)
    .then(response => response.json())
    .then(data => {
     // Shows data for the city user searched
        console.log(data);
        
    })
// COME BACK TO THIS, I WANT TO ADD AN ERROR WINDOW/ALERT, NOT INCLUDED IN README
    .catch(error => {

        console.log(error);
    });
});

var weatherData = [];

function fetchWeatherData (city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c2e41c2ad6868f94e2bbd03e123c92b8`)
    .then(response => response.json())
    .then(data => {
        // pulling required weather information
        var cityName = data.name;
        var temperature = data.main.temp; 
        var humidity = data.main.humidity;

        var currentWeather = {
            city: cityName, 
            temperature: temperature, 
            humidity: humidity,
        };

        weatherData.push(currentWeather);

    })

    .catch(error => {
        console.log("Error fetching weather data", error)
    });
}
  