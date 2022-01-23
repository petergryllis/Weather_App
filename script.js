let city_selection = "";
const API_KEY = "d44bc17c2091a2e0a516eae08c6d721d";

let CitySelectButton = document.getElementById("search-city-submit-button");
CitySelectButton.addEventListener("click", function() {
    let InputofCity = document.getElementById("search-city-form");
    Name_of_City = InputofCity.value;
    getCity(InputofCity.value);
    InputofCity.value = "";
});

//Set up function to take city entered and run through API
function getCity(city) {
    let API_URL_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}'
    getDATA(API_URL_LINK);
}


