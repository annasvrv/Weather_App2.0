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

function showTempCity(response) {
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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "74a1988810687be79d98c8fd17e5884a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempCity);
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

  temp.innerHTML = newTempF;
  unit.innerHTML = `ºF`;
  high.innerHTML = `H:${Math.round((currentHigh * 9) / 5 + 32)}ºF`;
  low.innerHTML = `L:${Math.round((currentLow * 9) / 5 + 32)}ºF`;
  feel.innerHTML = `${Math.round((currentFeel * 9) / 5 + 32)}ºF`;
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
  temp.innerHTML = Math.round(currentTemp);
  unit.innerHTML = `ºC`;
  high.innerHTML = `H:${Math.round(currentHigh)}ºC`;
  low.innerHTML = `L:${Math.round(currentLow)}ºC`;
  feel.innerHTML = `${Math.round(currentFeel)}ºC`;
}

let currentTemp = null;
let currentHigh = null;
let currentLow = null;
let currentFeel = null;

let linkUnitF = document.querySelector("#unitF");
linkUnitF.addEventListener("click", showUnitFtemp);

let linkUnitC = document.querySelector("#unitC");
linkUnitC.addEventListener("click", showUnitCtemp);

let form = document.querySelector("#searchCity-form");
form.addEventListener("submit", displayCity);

search("Los Angeles");
