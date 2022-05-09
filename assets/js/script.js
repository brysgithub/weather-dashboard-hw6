// Config
var APIKey = '1b0fb4dbb263612dfa69258bb1f04c3b';
var unitMeasure = 'imperial';

// testing
// var city = 'Seattle';
// searchCity(city);

var cityFormEl = document.getElementById('city-form');
var cityNameEl = document.getElementById('current-card-name');
var cityIconEl = document.getElementById('current-card-icon');
var cityTempEl = document.getElementById('current-card-temp');
var cityWindEl = document.getElementById('current-card-wind');
var cityHumidEl = document.getElementById('current-card-humid');
var cityUviEl = document.getElementById('current-card-uvi');

// Convert dt from unix
// function convertDt(unix) {
//     var dtConvert = new Date(unix * 1000);
//     var store = dat
// } 

// Find city
function searchCity(city) {
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    fetch(requestURL)
        .then(async function(response){
            if (response.ok) {
                var data = await response.json();
                console.log(data)
                console.log(data.name)
                appendCurrentName(data)
                getCurrentWeather(data.coord.lat, data.coord.lon)
            } else {
                alert(response.statusText)
            }
        })
};

// Find weather
function getCurrentWeather(lat, lon) {
    var requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=${unitMeasure}`;
    fetch(requestURL)
        .then(async function(response){
            if (response.ok) {
                var data = await response.json();
                console.log(data)
                console.log('temp: ' + data.current.temp + '°f', '\n', 'wind: ' + data.current.wind_speed + 'mph', '\n', 'humidity: ' + data.current.humidity + '%', '\n', 'uvi: ' + data.current.uvi, '\n', 'image tag: ' + data.current.weather[0].icon)
                appendCurrentData(data);
                renderCity5Day(data);
            } else {
                alert(response.statusText)
            }
        })
};

// Add city name to cards
function appendCurrentName(data) {
    cityNameEl.textContent = 'Current weather: ' + data.name;
}

// Add current weather data to main card
function appendCurrentData(data) {
    cityIconEl.setAttribute('src', `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);
    cityIconEl.style.visibility = 'visible';
    cityTempEl.textContent = 'Temp: ' + data.current.temp + '°f';
    cityWindEl.textContent = 'Wind: ' + data.current.wind_speed + ' MPH';
    cityHumidEl.textContent = 'Humidity: ' + data.current.humidity + ' %';
    cityUviEl.textContent = 'UVI: ' + data.current.uvi;
};

// Handle search submit
function citySubmit(event) {
    event.preventDefault();

    var searchInputText = document.getElementById('city-input').value;

    if (!searchInputText) {
        console.log('Please input a city!');
        return;
      }

    console.log(searchInputText);

    searchCity(searchInputText);

}

cityFormEl.addEventListener('submit', citySubmit);

// Render 5 day cards
function renderCity5Day(data) {
    
    for (let i = 1; i < 6; i++) {

        var cardTemplate = 
        `<div id="0" class="card" style="width: 10rem;">
            <div class="card-body">
                <h6 class="card-title">${moment.unix(data.daily[i].dt).format("MM/DD/YYYY")}</h6>
                <img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png" alt="Weather icon">
                <p class="card-text">Temp: ${data.daily[i].temp.day + '°f'}</p>
                <p class="card-text">Wind: ${data.daily[i].wind_speed + ' MPH'}</p>
                <p class="card-text">Humidity: ${data.daily[i].humidity + ' %'}</p>
            </div>
        </div>`
    
        $('#forecast-box').append(cardTemplate);
    }
};

function saveSearch() {

}