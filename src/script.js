//API
let apiKey = "f74c00b613a11dea2e6e66f4aa3444fe";

// The date, time, month etc
let now = new Date();

function formatDate(Date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentMonth = months[now.getMonth()];

  let currentDay = now.getDate();

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDate = `${dayOfWeek}, ${currentDay} ${currentMonth} - ${hour}h${minutes}`;
  let currentDateTime = document.querySelector("#current-time");
  currentDateTime.innerHTML = `${currentDate}`;
}
formatDate();

//displaying the forecast for the WEEK ahead
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecastWeek(response) {
  let forecast = response.data.daily.slice(1, 7);
  let forecastElement = document.querySelector("#forecastWeek");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
      forecastHTML =
        forecastHTML + 
        `
          <div class="col-2">
            <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
            <img 
              src="images/gif/${forecastDay.weather[0].icon}.svg"
              alt="weather-icon" 
              class="icon"   
              id="icon"
            />
            <div class="forecast-temperature">
              <span class="minTemperature" id="forecastTemp"> ${Math.round(forecastDay.temp.min)}</span><span class="minTemperatures">º </span>
              <span class="maxTemperature" id="forecastTemp"> ${Math.round(forecastDay.temp.max)}</span><span class="maxTemperatures">º </span>
            </div>
          </div>`;
    minForecastTemp = forecastDay.temp.min;
    maxForecastTemp = forecastDay.temp.max;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// display forecast for the HOURS ahead
function formatHour(timestamp) {
  let time = new Date(timestamp * 1000);
  let forecastHour = ("0" + time.getHours()).slice(-2);
  return (forecastHour);
}

function displayForecastHour (response) {
  let forecast = response.data.hourly.slice(1, 7);
  let forecastSecondElement = document.querySelector("#forecastHour");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastHour) {
    forecastHTML = 
      forecastHTML + 
      `
        <div class="col-2">
          <div class="forecast-hour">${formatHour(forecastHour.dt)}h</div>
          <img 
              src="images/gif/${forecastHour.weather[0].icon}.svg"
              alt="weather-icon" 
              class="icon"   
              id="icon"
          />
          <span class="forecast-temperatures" id="forecastTemp">${Math.round(forecastHour.temp)}</span><span class="forecast-temperature">º</span>
        </div>`;
  hourlyForecastTemp = forecastHour.temp;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastSecondElement.innerHTML = forecastHTML;
};

function getForecastWeek(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecastHour);
  axios.get(apiUrl).then(displayForecastWeek);
  
}

// search engine (showing the weather and the city)
function showWeather(response) {
  let showTemp = document.querySelector("#temp");
  showTemp.innerHTML = Math.round(response.data.main.temp);
  let showWind = document.querySelector("#wind-value");
  showWind.innerHTML = Math.round(response.data.wind.speed);
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = Math.round(response.data.main.humidity);
  let currentCity = document.querySelector("#location");
  currentCity.innerHTML = response.data.name;
  let showDescription = document.querySelector("#description");
  showDescription.innerHTML = response.data.weather[0].description;
  let showIcon = document.querySelector("#icon");
  showIcon.setAttribute(
    "src",
    `images/gif/${response.data.weather[0].icon}.svg`
  );
  showIcon.setAttribute("alt", response.data.weather[0].icon);

  coord = response.data.coord;

  getForecastWeek(response.data.coord);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
  //handling wrong city name
  axios
    .get(apiUrl)
    .then(showWeather)
    .catch(function (error) {
      alert("Oops! No city was found with this name.");
    });
}

function searchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#citySearch");
  formFahr.classList.remove("active");
  formCelsius.classList.add("active");

  searchCity(cityInput.value);
}
let citySearch = document.querySelector("#searchForm");
citySearch.addEventListener("submit", searchInput);


// get current location
function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showWeather);
  
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}
let currentCityButton = document.querySelector("#locationButton");
currentCityButton.addEventListener("click", currentLocation);

//changing from celsius to fahrenheit and reverse
function displayCelsiusTemp(event) {
  event.preventDefault();
  formFahr.classList.remove("active"); //adding active class from celsius link
  formCelsius.classList.add("active");
  units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
  let windUnits= document.querySelector("#windUnits");
  windUnits.innerHTML = "km/h";
  
}
let formCelsius = document.querySelector("#celsius-temp");
formCelsius.addEventListener("click", displayCelsiusTemp);

function displayFahrTemp(event) {
  event.preventDefault();
  formCelsius.classList.remove("active"); //remove active class from celsius link
  formFahr.classList.add("active");
  units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
  let windUnits= document.querySelector("#windUnits");
  windUnits.innerHTML = "mph";

  }
let formFahr = document.querySelector("#fahr-temp");
formFahr.addEventListener("click", displayFahrTemp); 

let coord = null;
let units = "metric"; 

//changing to dark mode
const htmlEl = document.getElementsByTagName('html')[0];
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
if (currentTheme) {
    htmlEl.dataset.theme = currentTheme;
}
const toggleTheme = (theme) => {
    htmlEl.dataset.theme = theme;
    localStorage.setItem('theme', theme);
}

searchCity("lisbon");