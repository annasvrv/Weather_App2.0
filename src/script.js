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
  console.log(response.data);
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

  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  highTemp.innerHTML = `H:${Math.round(response.data.main.temp_max)}ºC`;
  lowTemp.innerHTML = `L:${Math.round(response.data.main.temp_min)}ºC`;
  conditionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = response.data.wind.speed;
  feelElement.innerHTML = Math.round(response.data.main.feels_like);
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

let apiKey = "74a1988810687be79d98c8fd17e5884a";
let city = "Los Angeles";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTempCity);
