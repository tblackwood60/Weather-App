const btn_setCity = document.querySelector('.add_city');
const input_searchCity = document.querySelector('.search_city');
const btn_themeToggle = document.querySelector('.theme_toggle');
const content = document.querySelector('.content');
const body = document.querySelector('body');


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, fail);
} else {
    const geoError = document.createElement('p');
    geoError.textContent = "Your browser does not support geolocation";
}


async function success(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    const res = await fetch(apiUrl);
    console.log(res);

    if (!res.ok) {
        throw new Error('Response failed, could not get your city!');
    }

    const data = await res.json();
    const city = data.address.city || data.address.town || data.address.village;
    getWeatherData(city);
}

function fail() {
    content.textContent = '';
    const errorTxt = document.createElement('p');
    errorTxt.textContent = 'Could not get position data';
    errorTxt.style.color = 'rgba(206, 37, 37, 1)';
    errorTxt.style.fontSize = '30px';
    content.appendChild(errorTxt);
}


async function getWeatherData(city) {
    const apiKey = '4f1b44cd4801e896e9b521aa0ab46e77';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const res2 = await fetch(weatherApiUrl);
    console.log(res2);

    if (!res2.ok) {
        throw new Error('Could not get weather data');
    }

    const weatherData = await res2.json();
    setWeather(weatherData, city);
}


function setWeather(weatherData, city) {
    content.textContent = '';
    const {main: {temp, humidity}, wind: {speed}, weather: [{description, id}]} = weatherData;

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('h2');
    const humidityDisplay = document.createElement('p');
    const windDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherIcon = document.createElement('p');

    weatherIcon.classList.add('weatherIcon');
    tempDisplay.classList.add('tempDisplay');
    cityDisplay.classList.add('cityDisplay');
    windDisplay.classList.add('windDisplay');
    descDisplay.classList.add('descDisplay');
    humidityDisplay.classList.add('humidityDisplay');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(0)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    windDisplay.textContent = `Wind speed: ${speed}`;
    descDisplay.textContent = description;
    switch (true) {
        case id >= 200 &&  id < 300: 
            weatherIcon.textContent = '⛈️';
            body.style.background = "url('./Images/thunderstorm.webr') no-repeat";
            body.style.backgroundSize = "100%";
            body.style.maxHeight = "min-content";
            document.querySelectorAll('*').forEach(elem => elem.style.color = '#fff'); 
            btn_setCity.style.color = '#515151ff';
            btn_themeToggle.style.color = '#303030ff';
            break;
        case id >= 300 && id < 400 || id >= 500 &&  id < 600: 
            weatherIcon.textContent = '🌧️';
            body.style.background = "url('./Images/rain_img.webp') no-repeat";
            body.style.backgroundSize = "100%";
            body.style.maxHeight = "min-content";
            document.querySelectorAll('*').forEach(elem => elem.style.color = '#fff');  
            btn_setCity.style.color = '#515151ff';
            btn_themeToggle.style.color = '#303030ff';
            break;
        case id >= 600 &&  id < 700: 
            weatherIcon.textContent = '❄️';
            body.style.background = "url('./Images/snow_img.webp') no-repeat";
            body.style.backgroundSize = "100%";
            body.style.maxHeight = "min-content";
            document.querySelectorAll('*').forEach(elem => elem.style.color = '#fff'); 
            btn_setCity.style.color = '#515151ff';
            btn_themeToggle.style.color = '#303030ff';
            break;
        case id >= 700 &&  id < 800: 
            weatherIcon.textContent = '🌫️';
            body.style.background = "url('./Images/fog_img.webp') no-repeat";
            body.style.backgroundSize = "100%";
            body.style.maxHeight = "min-content";
            document.querySelectorAll('*').forEach(elem => elem.style.color = '#000'); 
            break;
        case id == 800: 
            weatherIcon.textContent = 'clear sky and sunny';
            body.style.background = "url('./Images/clear_sky_img.twebp') no-repeat";
            body.style.backgroundSize = "100%";
            body.style.maxHeight = "min-content";
            document.querySelectorAll('*').forEach(elem => elem.style.color = '#6b6b6bff');
            btn_setCity.style.color = '#515151ff';
            btn_themeToggle.style.color = '#303030ff';
            break;
        case id >= 801: 
            body.style.background = "url('./Images/cloud_img.webp') no-repeat";
            body.style.backgroundSize = "100%";
            body.style.maxHeight = "min-content";
            weatherIcon.textContent = '☁️';
            document.querySelectorAll('*').forEach(elem => elem.style.color = '#fff');
            btn_setCity.style.color = '#515151ff';
            btn_themeToggle.style.color = '#303030ff';
            break;
    }
    content.append(weatherIcon, cityDisplay, tempDisplay, humidityDisplay, windDisplay, descDisplay);
}

btn_setCity.addEventListener('click', e => {
    e.preventDefault();
    input_searchCity.style.display = input_searchCity.style.display == 'flex' ? 'none' : 'flex';
})

