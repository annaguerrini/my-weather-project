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
    "Saturday"
  ];
  let dayOfWeek = days[now.getDay()];

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
    "December"
  ];

  let currentMonth = months[now.getMonth()];

  let currentDay = now.getDate();

  let hour = now.getHours();
  console.log(hour);
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

// search engine (showing the weather and the city)
function showWeather(response) {
  console.log(response.data);
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
  
  celsiusTemperature = response.data.main.temp;
}



function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch");
  let units = "metric";
  let apiKey = "f74c00b613a11dea2e6e66f4aa3444fe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let newCity = document.querySelector("#searchForm");
newCity.addEventListener("submit", searchCity);

// get current location
function getLocationWeather(response) {
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("#location");
  currentCity.innerHTML = response.data.name;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = Math.round(response.data.main.humidity);
  let currentWind = document.querySelector("#wind-value");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = response.data.weather[0].description;
  
  celsiusTemperature = response.data.main.temp;
}

function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "f74c00b613a11dea2e6e66f4aa3444fe";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(url);

  axios.get(url).then(getLocationWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentCityButton = document.querySelector("#locationButton");
currentCityButton.addEventListener("click", currentLocation);

//

function searchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#citySearch");
  let search = document.querySelector("#location");
  search.innerHTML = `${cityInput.value}`;
}
let citySearch = document.querySelector("#searchForm");
citySearch.addEventListener("submit", searchInput);

//changing from celsius to fahrenheit and reverse

function displayCelsiusTemp(event) {
  event.preventDefault();
  let degrees = document.querySelector("#temp");
  formFahr.classList.remove("active");
  formCelsius.classList.add("active");
  degrees.innerHTML = Math.round(celsiusTemperature);
}
let formCelsius = document.querySelector("#celsius-temp");
formCelsius.addEventListener("click", displayCelsiusTemp);

function displayFahrTemp(event) {
  event.preventDefault();
  let degrees = document.querySelector("#temp");
  //remove active class from celisus link
  formCelsius.classList.remove("active");
  formFahr.classList.add("active");
  let fahrenheitConversion = (celsiusTemperature * 9) / 5 + 32;
  degrees.innerHTML = Math.round(fahrenheitConversion);
}
let formFahr = document.querySelector("#fahr-temp");
formFahr.addEventListener("click", displayFahrTemp);

let celsiusTemperature = null

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

search("Lisbon")