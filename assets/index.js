var apiKey = "8f447ec5f5390a5812cb2483a3623d3c";
var submitButton = document.getElementById("submitButton");
var city = $("#findCity");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var date = document.querySelector(".date");
var selectedSearchCity = document.querySelector(".selectedSearchedCity");
var fiveDay = $(".five-day-forecast");

function weatherForecast(event) {
  event.preventDefault();
  getCity(city.val());
}

function getCity(cityName) {
  var weatherUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(window);
      var lat = data[0].lat;
      var lon = data[0].lon;

      var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`;

      fetch(weatherUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          forecastRender(data);
        });
    });
}

function forecastRender(data) {
  var dayArr = data.list;
  var counter = 0;
  fiveDay.each(function (index, element) {
    var date = dayArr[counter].dt_txt;
    var temp = dayArr[counter].main.temp_max + " F";
    var wind = dayArr[counter].wind.speed + " MPH";
    var humidity = dayArr[counter].main.humidity + " Humidity";
    console.log($(this));
    console.log(index, element);
    // $(`${$(this)} .date0`).text(date);
    $(this).children(".date0").text(date);
    $(this).children("#temp0").text(temp);
    $(this).children("#wind0").text(wind);
    $(this).children("#humidity0").text(humidity);

    counter += 5;
  });
}

$("#submitButton").on("click", weatherForecast);
