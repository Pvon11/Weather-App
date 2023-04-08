var apiKey = "8f447ec5f5390a5812cb2483a3623d3c";
var submitButton = document.getElementById("submitButton");
var city = document.getElementById("findCity");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var date = document.querySelector(".date");
var selectedSearchCity = document.querySelector(".selectedSearchedCity");

function weatherForecast() {
  fetchAPI();
  getCity(city.val());
  selectedSearchCity.textContent = "City: " + city.val;
}
// get the weather url with api key
function fetchAPI() {
  var weatherUrl = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  fetch(weatherUrl).then(function (response) {
    if (!response.ok) {
      throw response.json();
    }
    return response.json();
  });
}

function getCity(cityName) {
  fetch((`https://geocode.maps.co/search?q=${cityName}`));
  .then(response => {
    return response.json
  })
  .then(data => {
    let lat = data[0].lat;
    let lon = data[0]lon;
    
  })

}

$("#submitButton").on("click", weatherForecast);
