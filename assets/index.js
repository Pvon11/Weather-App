var apiKey = "8f447ec5f5390a5812cb2483a3623d3c";
var submitButton = document.getElementById("submitButton");
var city = $("#findCity");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var date = document.querySelector(".date");
var selectedSearchCity = document.querySelector(".selectedSearchedCity");
var fiveDay = $(".five-day-forecast");
var date = function weatherForecast(event) {
  event.preventDefault();
  getCity(city.val());
};

var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
console.log(storedCities);

function writeSavedCityButtons() {
  $.each(storedCities, function (index, element) {
    console.log(element);
    $("#savedCities").append(`<button>${element}</button>`);
  });
}
writeSavedCityButtons();

function getCity(event) {
  event.preventDefault();

  let cityName;

  event.target.id === "submitButton"
    ? (cityName = $("#findCity").val())
    : (cityName = event.target.innerText);

  storedCities.push(cityName);
  localStorage.setItem("cities", JSON.stringify(storedCities));

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
  $("#savedCities").empty();
}

function forecastRender(data) {
  var dayArr = data.list;
  var counter = 0;
  fiveDay.each(function (index, element) {
    var date = dayArr[counter].dt_txt;
    date = dayjs(date).format("MM/DD/YYYY");
    // var iconUrl = dayArr[counter].iconUrl;
    var iconurl =
      "http://openweathermap.org/img/w/" +
      dayArr[counter].weather[0].icon +
      ".png";
    var temp = dayArr[counter].main.temp_max + "℉";
    var wind = dayArr[counter].wind.speed + " MPH";
    var humidity = dayArr[counter].main.humidity + " % Humidity";
    console.log($(this));
    console.log(index, element);

    $(this).children(".date0").text(date);
    $(this).children("#temp0").text(temp);
    $(this).children("#wind0").text(wind);
    $(this).children("#humidity0").text(humidity);
    $(this).children("#img0").attr("src", iconurl);

    counter += 5;
  });
  writeSavedCityButtons();
}

$("#submitButton").on("click", getCity);
$("#savedCities").on("click", getCity);
