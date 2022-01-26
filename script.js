let city_selection = "";
const API_KEY = "14ec96a21c589975c0ca5f2135b87903";

let CitySelectButton = document.getElementById("search-city-submit-button");
CitySelectButton.addEventListener("click", function() {
    let InputofCity = document.getElementById("search-city-form");
    city_selection = InputofCity.value;
    
    getCity(InputofCity.value);
    InputofCity.value = "";
   
});

//Set up function to take city entered and run through API
function getCity(city) {
    let API_URL_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}'
    getDATA(API_URL_LINK);
}


//Set up function to obtain the weather data from API

function getDATA(API_URL_Link) {
    fetch(API_URL_Link)
    .then(function(response) {
       if (response.ok) {
        response.json()
        .then(function(data) {  
            function getCityData(data) {
                console.log(data);
                let currentWeatherTitle = document.getElementById("current-weather-title");
                let name = data.name;
                currentWeatherTitle.textContent = name
                
                let latitude = data.coord.lat;
                let longitude = data.coord.lon;

                let cityUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`

            
                fetch(cityUrl)
                .then(function(response) {
                    response.json()
                    .then(function(data) {
                        let dateTime = new Date(data.current.dt * 1000).toLocaleString();
                        dateTime = dateTime.split(",");
                        dateTime = dateTime[0];
                        let currentIcon = document.getElementById("todays-image");
                        let icon = data.current.weather[0].icon;
                        currentIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
                        currentWeatherTitle.textContent = name + " (" + dateTime + ") ";
                        currentIcon.style.display = "block";
                        getForecast(data);
                        displayData(data);
                    });
                });
            }
            getCityData(data);
        });
        if (city_name != "") {
            createSavedList(city_name);
        }
       }
    });
}




// Function to handle displaying the data
function displayData(weatherData) {
    // Obtain weather data from API to display information--

    let temperature = document.getElementById("temp");
    let wind = document.getElementById("Wind");
    let humidity = document.getElementById("Humidity");
    let uvIndex = document.getElementById("UVIndex")

    
    // Extract userful information from the data
    let currentTemp = weatherData.current.feels_like;
    let windSpeed = weatherData.current.wind_speed;
    let currentHumidity = weatherData.current.humidity;
    let uvi = weatherData.current.uvi;

    // Assign the data obtained from the API to the HTML values which are obtained from the to the api
    temperature.textContent = "Temperature: " + currentTemp + " C";
    wind.textContent = "Wind: " + windSpeed + " km/hr";
    humidity.textContent = "Humidity: " + currentHumidity + " %";
    uvIndex.textContent = uvi;

    // Filter color codes based on UV value
    if (uvi <= 4 ) {
        uvIndex.style.background = "green";
    } else if (uvi > 4 && uvi <= 8) {
        uvIndex.style.background = "yellow";
    } else {
        uvIndex.style.background = "red";
    }
}




//forecast function 
function getForecast(data) {
    // get the card from the DOM'
    let forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";
    // Get the next 5 days
    for (let i=1; i<5; i++) {
        let forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-square");
        forecastContainer.appendChild(forecastCard);
        // get the date for each day
        let dateTime = new Date(data.daily[i].dt * 1000).toLocaleString();
        dateTime = dateTime.split(",");
        dateTime = dateTime[0];
        let forecastDate = document.createElement("h1");
        forecastDate.classList.add("forecast-date");
        forecastDate.textContent = dateTime;
        forecastCard.appendChild(forecastDate);
        // Get the icon for the weather
        let icon = data.daily[i].weather[0].icon;
        let forecastIcon = document.createElement("img");
        forecastIcon.classList.add("forecast-icon");
        forecastIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
        forecastCard.appendChild(forecastIcon);
        // get the temperature for each day
        let temperature = data.daily[i].feels_like.day;
        let forecastTemperature = document.createElement("p");
        forecastTemperature.textContent = "Temperature: " + temperature + " C";
        forecastCard.appendChild(forecastTemperature);
        forecastTemperature.classList.add("forecast-temp");
        // get the wind for each day
        let wind = data.daily[i].wind_speed;
        let forecastWind = document.createElement("p");
        forecastWind.textContent = "Wind: " + wind + " KM/H";
        forecastCard.appendChild(forecastWind);
        forecastWind.classList.add("forecast-wind");
        // get the humidity for each day
        let humidity = data.daily[i].humidity;
        let forecastHumidity = document.createElement("p");
        forecastHumidity.textContent = "Humidity: " + humidity + "%";
        forecastCard.appendChild(forecastHumidity);
        forecastHumidity.classList.add("forecast-humidity");
    }
    // get the date for each day
    // get the icons
    console.log(data);
    // add each day to a card to be displayed at the bottom of the page
}