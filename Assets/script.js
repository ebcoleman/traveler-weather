var weatherAPI = "c2e41c2ad6868f94e2bbd03e123c92b8";
var cityInput = document.getElementById("cityInput");
var searchButton = document.getElementById("searchButton");

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


  