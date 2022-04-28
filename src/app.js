function search(city) {
  let apiKey = "017b675a2211b158bb6a64666e9c48b3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return ` ${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector("#currentcity").innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#defaulttemp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#currentcity");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let PrecipitationElement = document.querySelector("#Precipitation");
  PrecipitationElement.innerHTML = response.data.main.pressure;
  let HumidityElement = document.querySelector("#Humidity");
  HumidityElement.innerHTML = response.data.main.humidity;
  let WindElement = document.querySelector("#Wind");
  WindElement.innerHTML = response.data.wind.speed;
  let dateElement = document.querySelector("#Place");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconELement = document.querySelector("#icon");
  iconELement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconELement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#searching");
form.addEventListener("click", handleSubmit);

function getLocation(position) {
  let apiKey = "017b675a2211b158bb6a64666e9c48b3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function CurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
let currentLocationButton = document.querySelector("#currentbutton");
currentLocationButton.addEventListener("click", CurrentLocation);

function changetoF(event) {
  event.preventDefault();
  let farenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureforunitpart = document.querySelector("#defaulttemp");
  temperatureforunitpart.innerHTML = farenheitTemperature;
}
let toF = document.querySelector("#farenheit");
toF.addEventListener("click", changetoF);

function changetoC(event) {
  event.preventDefault();
  let temperatureforunitpart = document.querySelector("#defaulttemp");
  temperatureforunitpart.innerHTML = Math.round(celsiusTemperature);
}
let toC = document.querySelector("#celsius");
toC.addEventListener("click", changetoC);

let celsiusTemperature = null;

function getForecast(coordinates) {
  let apiKey = "017b675a2211b158bb6a64666e9c48b3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
       <div class="col-2" id="weather-forecast-all">
         <div class="weather-forecast">${formatDay(forecastDay.dt)}</div>
         <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="60"
         />
         <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-maximum"> ${Math.round(
              forecastDay.temp.max
            )} </span>
                -
            <span class="weather-forecast-temperature-minimum"> ${Math.round(
              forecastDay.temp.min
            )} </span>
         </div>
       </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
search("Ho Chi Minh");
