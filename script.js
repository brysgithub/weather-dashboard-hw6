var APIKey = '1b0fb4dbb263612dfa69258bb1f04c3b';
var unitMeasure = 'imperial';

var city = 'Seattle';

var cityNameEl = document.getElementById('current-card-name');

function searchCity() {
    var requestURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    fetch(requestURL)
        .then(async function(response){
            if (response.ok) {
                var data = await response.json();
                // console.log(data)
                console.log(data.name)
                getCurrentWeather(data.coord.lat, data.coord.lon)
            } else {
                alert(response.statusText)
            }
        })
};

function getCurrentWeather(lat, lon) {
    var requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=${unitMeasure}`;
    fetch(requestURL)
        .then(async function(response){
            if (response.ok) {
                var data = await response.json();
                // console.log(data)
                console.log('temp: ' + data.current.temp + '°f', '\n', 'wind: ' + data.current.wind_speed + 'mph', '\n', 'humidity: ' + data.current.humidity + '%', '\n', 'uvi: ' + data.current.uvi, '\n', 'image tag: ' + data.current.weather[0].icon)
                appendData(data);
            } else {
                alert(response.statusText)
            }
        })
};

function appendData() {
    
};

searchCity();