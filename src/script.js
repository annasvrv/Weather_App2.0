function formatWeek(timestamp) {
  let date1 = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = days[date1.getDay()];
  return `${weekDay}`;
}

function formatDay(timestamp) {
  let date2 = new Date(timestamp);
  let hours = date2.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date2.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date2.getMonth()];
  let day = date2.getDate();
  let year = date2.getFullYear();
  return `${month} ${day} ${year} ${hours}:${minutes}`;
}

function formatWeekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily.slice(1, 8);
  let forecastElement = document.querySelector("#forecast-display");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, i) {
    if (i < 7) {
      forecastHTML =
        forecastHTML +
        `      
                     <div class="col weekday">
                        <div class="week-day">${formatWeekDay(
                          forecastDay.dt
                        )}</div>
                        
                        <div class="icon-forecast">
                          <img
                            src="https://openweathermap.org/img/wn/${
                              forecastDay.weather[0].icon
                            }@2x.png"
                            alt=""
                            width="40px"
                          />
                        </div>
                        <div class="temp-forecast" id="temp-forecast">${Math.round(
                          forecastDay.temp.day
                        )}º</div>
                      </div>
                    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;

  forecastTemp = forecast;
}

function getForecast(coordinates) {
  let apiKey = "74a1988810687be79d98c8fd17e5884a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${apiunit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayData(response) {
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let highTemp = document.querySelector("#high");
  let lowTemp = document.querySelector("#low");
  let conditionElement = document.querySelector("#condition");
  let windElement = document.querySelector("#wind");
  let feelElement = document.querySelector("#realFeel");
  let humidElement = document.querySelector("#humidity");
  let pressureElement = document.querySelector("#pressure");
  let weekdayElement = document.querySelector("#weekDay");
  let dateElement = document.querySelector("#clock");
  let iconElement = document.querySelector("#icon");
  let unit = document.querySelector("#currentUnit");

  currentTemp = response.data.main.temp;
  unit.innerHTML = `ºC`;
  currentHigh = response.data.main.temp_max;
  currentLow = response.data.main.temp_min;
  currentFeel = response.data.main.feels_like;

  tempElement.innerHTML = Math.round(currentTemp);
  cityElement.innerHTML = response.data.name;
  highTemp.innerHTML = `H:${Math.round(currentHigh)}ºC`;
  lowTemp.innerHTML = `L:${Math.round(currentLow)}ºC`;
  conditionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = response.data.wind.speed;
  feelElement.innerHTML = `${Math.round(currentFeel)}ºC`;
  humidElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = response.data.main.pressure;
  weekdayElement.innerHTML = formatWeek(response.data.dt * 1000);
  dateElement.innerHTML = formatDay(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showMyPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "74a1988810687be79d98c8fd17e5884a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}
&lon=${lon}&units=${apiunit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayData);
}

function myLocation(event) {
  event.preventDefault();
  linkUnitF.classList.remove("active");
  linkUnitC.classList.add("active");
  navigator.geolocation.getCurrentPosition(showMyPosition);
}

function search(city) {
  let apiKey = "74a1988810687be79d98c8fd17e5884a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${apiunit}`;
  axios.get(apiUrl).then(displayData);
}

function displayCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#citySearch-input").value;
  linkUnitF.classList.remove("active");
  linkUnitC.classList.add("active");
  search(cityInputElement);
}

function showUnitFtemp(event) {
  event.preventDefault();
  linkUnitC.classList.remove("active");
  linkUnitF.classList.add("active");

  let newTempF = Math.round((currentTemp * 9) / 5 + 32);
  let temp = document.querySelector("#temperature");
  let unit = document.querySelector("#currentUnit");
  let high = document.querySelector("#high");
  let low = document.querySelector("#low");
  let feel = document.querySelector("#realFeel");
  let divTemp = document.getElementsByClassName("temp-forecast");

  temp.innerHTML = newTempF;
  unit.innerHTML = `ºF`;
  high.innerHTML = `H:${Math.round((currentHigh * 9) / 5 + 32)}ºF`;
  low.innerHTML = `L:${Math.round((currentLow * 9) / 5 + 32)}ºF`;
  feel.innerHTML = `${Math.round((currentFeel * 9) / 5 + 32)}ºF`;
  for (i = 0; i < 7; i++) {
    divTemp[i].innerHTML = `${Math.round(
      (forecastTemp[i].temp.day * 9) / 5 + 32
    )}º`;
  }
}

function showUnitCtemp(event) {
  event.preventDefault();
  linkUnitF.classList.remove("active");
  linkUnitC.classList.add("active");

  let temp = document.querySelector("#temperature");
  let unit = document.querySelector("#currentUnit");
  let high = document.querySelector("#high");
  let low = document.querySelector("#low");
  let feel = document.querySelector("#realFeel");
  let divTemp = document.getElementsByClassName("temp-forecast");

  temp.innerHTML = Math.round(currentTemp);
  unit.innerHTML = `ºC`;
  high.innerHTML = `H:${Math.round(currentHigh)}ºC`;
  low.innerHTML = `L:${Math.round(currentLow)}ºC`;
  feel.innerHTML = `${Math.round(currentFeel)}ºC`;
  for (i = 0; i < 7; i++) {
    divTemp[i].innerHTML = `${Math.round(forecastTemp[i].temp.day)}º`;
  }
}

let currentTemp = null;
let currentHigh = null;
let currentLow = null;
let currentFeel = null;
let apiunit = "metric";
let forecastTemp = [];

let linkUnitF = document.querySelector("#unitF");
linkUnitF.addEventListener("click", showUnitFtemp);

let linkUnitC = document.querySelector("#unitC");
linkUnitC.addEventListener("click", showUnitCtemp);

let currentLocation = document.querySelector("#cityCurrent-location-button");
currentLocation.addEventListener("click", myLocation);

let form = document.querySelector("#searchCity-form");
form.addEventListener("submit", displayCity);

search("New York");
