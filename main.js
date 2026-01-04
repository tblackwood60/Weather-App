const btn_setCity = document.querySelector('.add_city');
const input_searchCity = document.querySelector('.search_city');
const btn_searchCity = document.querySelector('.btn_search');
const btn_themeToggle = document.querySelector('.theme_toggle');
const content = document.querySelector('.content');
const body = document.querySelector('body');
const yourcity = document.querySelector('.your_city');
const grey_color = "rgb(73, 73, 73)";
const white_color = "#fcfcfc";

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
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    windDisplay.textContent = `Wind speed: ${speed} m/s`;
    descDisplay.textContent = description;

    content.append(weatherIcon, cityDisplay, tempDisplay, humidityDisplay, windDisplay, descDisplay);

    switch (true) {
        case id >= 200 &&  id < 300: 
            weatherIcon.textContent = '⛈️';
            body.style.background = "url('./Images/thunderstorm.webp') no-repeat";
            body.style.backgroundSize = "100%";
            content.querySelectorAll('*').forEach(elem => elem.style.color = white_color); 
            yourcity.style.color = white_color;
            break;
        case id >= 300 && id < 400 || id >= 500 &&  id < 600: 
            weatherIcon.textContent = '🌧️';
            body.style.background = "url('./Images/rain_img.webp') no-repeat";
            body.style.backgroundSize = "100%";
            content.querySelectorAll('*').forEach(elem => elem.style.color = white_color);
            yourcity.style.color = white_color;
            break;
        case id >= 600 &&  id < 700: 
            weatherIcon.textContent = '❄️';
            body.style.background = "url('./Images/snow_img.jpg') no-repeat";
            body.style.backgroundSize = "100%";
            content.querySelectorAll('*').forEach(elem => elem.style.color = grey_color); 
            yourcity.style.color = grey_color;
            break;
        case id >= 700 &&  id < 800: 
            weatherIcon.textContent = '🌫️';
            body.style.background = "url('./Images/fog_img.png') no-repeat";
            body.style.backgroundSize = "100%";
            content.querySelectorAll('*').forEach(elem => elem.style.color = grey_color); 
            yourcity.style.color = grey_color;
            break;
        case id == 800: 
            weatherIcon.textContent = '☀️';
            body.style.background = "url('./Images/clear_sky_img.jpg') no-repeat";
            body.style.backgroundSize = "100%";
            content.querySelectorAll('*').forEach(elem => elem.style.color = white_color);
            yourcity.style.color = grey_color;
            break;
        case id >= 801: 
            body.style.background = "url('./Images/cloud_img.webp') no-repeat";
            body.style.backgroundSize = "100%";
            weatherIcon.textContent = '☁️';
            content.querySelectorAll('*').forEach(elem => elem.style.color = white_color);
            yourcity.style.color = white_color;
            break;
    }
}

async function getWeatherData2(city) {
    const apiKey = '4f1b44cd4801e896e9b521aa0ab46e77';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const res2 = await fetch(weatherApiUrl);
    console.log(res2);

    if (!res2.ok) {
        throw new Error('Could not get weather data');
    }

    const weatherData = await res2.json();
    setWeather2(weatherData, city);
}

function setWeather2(weatherData, city) {
    const newCityCont = document.createElement('div');
    newCityCont.classList.add('newcitycont');
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
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    windDisplay.textContent = `Wind speed: ${speed} m/s`;
    descDisplay.textContent = description;

    newCityCont.append(weatherIcon, cityDisplay, tempDisplay, humidityDisplay, windDisplay, descDisplay);
    body.appendChild(newCityCont);

    switch (true) {
        case id >= 200 &&  id < 300: 
            weatherIcon.textContent = '⛈️';
            newCityCont.style.background = "url('./Images/thunderstorm.webp') no-repeat";
            newCityCont.style.backgroundSize = "100%";
            newCityCont.querySelectorAll('*').forEach(elem => elem.style.color = white_color); 
            break;
        case id >= 300 && id < 400 || id >= 500 &&  id < 600: 
            weatherIcon.textContent = '🌧️';
            newCityCont.style.background = "url('./Images/rain_img.webp') no-repeat";
            newCityCont.style.backgroundSize = "100%";
            newCityCont.querySelectorAll('*').forEach(elem => elem.style.color = white_color);  
            break;
        case id >= 600 &&  id < 700: 
            weatherIcon.textContent = '❄️';
            newCityCont.style.background = "url('./Images/snow_img.webp') no-repeat";
            newCityCont.style.backgroundSize = "100%";
            newCityCont.querySelectorAll('*').forEach(elem => elem.style.color = grey_color); 
            break;
        case id >= 700 &&  id < 800: 
            weatherIcon.textContent = '🌫️';
            newCityCont.style.background = "url('./Images/fog_img.png') no-repeat";
            newCityCont.style.backgroundSize = "100%";
            newCityCont.querySelectorAll('*').forEach(elem => elem.style.color = grey_color); 
            break;
        case id == 800: 
            weatherIcon.textContent = '☀️';
            newCityCont.style.background = "url('./Images/clear_sky_img.jpg') no-repeat";
            newCityCont.style.backgroundSize = "100%";
            newCityCont.querySelectorAll('*').forEach(elem => elem.style.color = white_color);
            break;
        case id >= 801: 
            weatherIcon.textContent = '☁️';
            newCityCont.style.background = "url('./Images/cloud_img.webp') no-repeat";
            newCityCont.style.backgroundSize = "100%";
            newCityCont.querySelectorAll('*').forEach(elem => elem.style.color = white_color);
            break;
    }
}

btn_setCity.addEventListener('click', e => {
    e.preventDefault();
    input_searchCity.style.display = input_searchCity.style.display == 'flex' ? 'none' : 'flex';
    btn_searchCity.style.display = btn_searchCity.style.display == 'flex' ? 'none' : 'flex';
})

btn_searchCity.addEventListener('click', e => {
    e.preventDefault();
    if (input_searchCity.value == '') {
        alert('Please, enter a city!');
        return;
    }
    const city = input_searchCity.value;
    input_searchCity.value = '';
    getWeatherData2(city);
})

