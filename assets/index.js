const apiKey = "8f447ec5f5390a5812cb2483a3623d3c";
const submitButton = document.getElementById("submitButton");
const cityInput = document.querySelector("#findCity");
const temp = document.querySelector("#temp");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const date = document.querySelector(".date");
const selectedSearchCity = document.querySelector(".selectedSearchedCity");
const fiveDay = $(".five-day-forecast");
const savedCitiesContainer = $("#savedCities");

let storedCities = JSON.parse(localStorage.getItem("cities")) || [];
console.log(storedCities);

function writeSavedCityButtons() {
  savedCitiesContainer.empty();
  storedCities.forEach((city) => {
    savedCitiesContainer.append(`<button>${city}</button>`);
  });
}
writeSavedCityButtons();

function getCity(event) {
  event.preventDefault();

  let cityName;

  if (event.target.id === "submitButton") {
    cityName = cityInput.value;
  } else {
    cityName = event.target.innerText;
  }

  storedCities.push(cityName);
  localStorage.setItem("cities", JSON.stringify(storedCities));

  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
  fetch(geoUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`;

      fetch(weatherUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          forecastRender(data);
        });
    });

  writeSavedCityButtons();
}

function forecastRender(data) {
  const dayArr = data.list;
  let counter = 0;

  fiveDay.each(function (index, element) {
    const date = dayjs(dayArr[counter].dt_txt).format("MM/DD/YYYY");
    const iconUrl = `http://openweathermap.org/img/w/${dayArr[counter].weather[0].icon}.png`;
    const temperature = `${dayArr[counter].main.temp_max}℉`;
    const windSpeed = `${dayArr[counter].wind.speed} MPH`;
    const humidityValue = `${dayArr[counter].main.humidity}% Humidity`;

    $(this).children(".date0").text(date);
    $(this).children("#temp0").text(temperature);
    $(this).children("#wind0").text(windSpeed);
    $(this).children("#humidity0").text(humidityValue);
    $(this).children("#img0").attr("src", iconUrl);

    counter += 5;
  });
}

submitButton.addEventListener("click", getCity);
savedCitiesContainer.on("click", "button", getCity);
