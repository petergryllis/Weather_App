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
    let API_URL_LINK = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    getDATA(API_URL_LINK);
}


//Set up function to obtain the weather data from API

function getDATA(URL_Link) {
    fetch(URL_Link)
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
        if (city_selection != "") {
            
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

    // Assign the data obtained from the API to the HTML values which are displayed
    temperature.textContent = "Temperature: " + currentTemp + " C";
    wind.textContent = "Wind: " + windSpeed + " km/hr";
    humidity.textContent = "Humidity: " + currentHumidity + " %";
    uvIndex.textContent = uvi;

    // Filter colour codes based on UV value and output a colour of either green, yellow or red
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
    
    
    
    // Get the next 5 days. Commence count from 1 to by pass the first days forecast
    for (let i=1; i<5; i++) {
        let forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-square");
        forecastContainer.appendChild(forecastCard);
      
      
        // get the date for each day. Approach below similar for icon, temp, wind and humidity
        let dateAllocated = new Date(data.daily[i].dt * 1000).toLocaleString();
        dateAllocated = dateAllocated.split(",");
        dateAllocated = dateAllocated[0];
        let forecastDate = document.createElement("h1");
        forecastDate.classList.add("forecast-date");
        forecastDate.textContent = dateAllocated;
        forecastCard.appendChild(forecastDate);



        // Get the icon for the weather using API link
        let icon = data.daily[i].weather[0].icon;
        let forecastIcon = document.createElement("img");
        forecastIcon.classList.add("forecast-icon");
        forecastIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
        forecastCard.appendChild(forecastIcon);
       
       
        // get the temperature for each day
        let API_temperature = data.daily[i].feels_like.day;
        let TemperatureForecasted = document.createElement("p");
        TemperatureForecasted.textContent = "Temperature: " + API_temperature + " C";
        forecastCard.appendChild(TemperatureForecasted);
        TemperatureForecasted.classList.add("forecast-temp");
        
        
        // get the wind for each day
        let windSpeed = data.daily[i].wind_speed;
        let WindForecasted = document.createElement("p");
        WindForecasted.textContent = "Wind: " + windSpeed + " KM/H";
        forecastCard.appendChild(WindForecasted);
        WindForecasted.classList.add("forecast-wind");
        
        
        // get the humidity for each day
        let API_humidity = data.daily[i].humidity;
        let HumidityForecasted = document.createElement("p");
        HumidityForecasted.textContent = "Humidity: " + API_humidity + "%";
        forecastCard.appendChild(HumidityForecasted);
        HumidityForecasted.classList.add("forecast-humidity");
    }

    console.log(data);
    
}