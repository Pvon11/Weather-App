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
  // selectedSearchCity.textContent = "City: " + city.val;
}
// get the weather url with api key
// function fetchAPI() {
//   var weatherUrl = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
//   fetch(weatherUrl).then(function (response) {
//     if (!response.ok) {
//       throw response.json();
//     }
//     return response.json();
//   });
// }

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

      var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      fetch(weatherUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          forecastRender(data);
          //firstDayRender(data)
        });
    });
}

function forecastRender(data) {
  var dayArr = data.list;
  var counter = 0;
  fiveDay.each(function () {
    var date = dayArr[counter].dt_txt;
    var temp = dayArr[counter].temp;
    console.log($(this));
    // $(`${$(this)} .date0`).text(date);
    $(this).children(".date0").text(date);
    $(this).children(".temp0").text(temp);
    // $(this).children(".date0").text(date);
    // $(this).children(".date0").text(date);

    counter += 5;
  });
}

$("#submitButton").on("click", weatherForecast);
