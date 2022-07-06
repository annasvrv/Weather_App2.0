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

  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  highTemp.innerHTML = `H:${Math.round(response.data.main.temp_max)}ºC`;
  lowTemp.innerHTML = `L:${Math.round(response.data.main.temp_min)}ºC`;
  conditionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = response.data.wind.speed;
  feelElement.innerHTML = Math.round(response.data.main.feels_like);
  humidElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = response.data.main.pressure;
}

let apiKey = "74a1988810687be79d98c8fd17e5884a";
let city = "Los Angeles";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTempCity);
