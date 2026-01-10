const btn_setCity = document.querySelector('.add_city');
const input_searchCity = document.querySelector('.search_city');
const btn_searchCity = document.querySelector('.btn_search');
const btn_themeToggle = document.querySelector('.theme_toggle');
const body = document.querySelector('body');
const yourcity = document.querySelector('.your_city');
const grey_color = "rgb(73, 73, 73)";
const white_color = "#fcfcfc";
const div_blocks = document.querySelector('.div_blocks');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, fail);
} else {
    const geoError = document.createElement('p');
    geoError.textContent = "Your browser does not support geolocation";
}

async function success(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    const res1 = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
    console.log(res1);
    if (!res1.ok) {
        throw new Error('Response failed could not get your city');
    }

    const data = await res1.json();
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
    const apiKey = '784e0612eb320956a4a0cfd5396032c9';
    const res2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    console.log(res2);
    if (!res2.ok) {
        throw new Error('Could not get weather data');
    }

    const weatherData = await res2.json();

    const {lat, lon} = weatherData.coord;
    const res3 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    console.log(res3);
    if (!res3.ok) {
        throw new Error('Could not get 5 days forecast');
    }
    const forecast7 = await res3.json();
    setWeather(weatherData, city, forecast7.list);
}

function setWeather(weatherData, city, forecast7) {
    const content = document.createElement('div');
    content.classList.add('content');
    div_blocks.append(content);
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
            content.style.background = "url('./Images/thunderstorm.webp') no-repeat";
            content.style.backgroundSize = "100%";
            content.querySelectorAll('*').forEach(elem => elem.style.color = white_color); 
            break;
        case id >= 300 && id < 400 || id >= 500 &&  id < 600: 
            weatherIcon.textContent = '🌧️';
            content.style.background = "url('./Images/rain_img.webp') no-repeat";
            content.style.backgroundSize = "100%";
            content.querySelectorAll('*').forEach(elem => elem.style.color = white_color);
            break;
        case id >= 600 &&  id < 700: 
            weatherIcon.textContent = '❄️';
            content.style.background = "url('./Images/snow_img.jpg') no-repeat";
            content.style.backgroundSize = "100%";
            content.querySelectorAll('*').forEach(elem => elem.style.color = grey_color); 
            break;
        case id >= 700 &&  id < 800: 
            weatherIcon.textContent = '🌫️';
            content.style.background = "url('./Images/fog_img.png') no-repeat";
            content.style.backgroundSize = "100%";
            content.querySelectorAll('*').forEach(elem => elem.style.color = grey_color); 
            break;
        case id == 800: 
            weatherIcon.textContent = '☀️';
            content.style.background = "url('./Images/clear_sky_img.jpg') no-repeat";
            content.style.backgroundSize = "100%";
            content.querySelectorAll('*').forEach(elem => elem.style.color = white_color);
            break;
        case id >= 801: 
            content.style.background = "url('./Images/cloud_img.webp') no-repeat";
            content.style.backgroundSize = "100%";
            weatherIcon.textContent = '☁️';
            content.querySelectorAll('*').forEach(elem => elem.style.color = white_color);
            break;
    }
    setForecast(forecast7, content, id);
}

function setForecast(forecast7, content, id) {
    const h1_fewdays = document.createElement('h2');
    h1_fewdays.classList.add('h1_fewdays');
    h1_fewdays.textContent = 'Forecast on next 5 days';
    h1_fewdays.style.color = '#ebebebff';
    const forecastBlocks = document.createElement('div');
    forecastBlocks.classList.add('forecastBlocks');
    content.append(h1_fewdays,forecastBlocks);

    for (let i = 0; i <= forecast7.length; i += 8) {
        const dayData = forecast7[i];
        const {main: {temp, humidity}} = dayData;
        const {description} = dayData.weather[0];

        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        const temp5 = document.createElement('p')
        const humidity5 = document.createElement('p');
        const desc5 = document.createElement('p');

        div.classList.add('forecastBlock');
        h3.textContent = `Day ${i / 8 + 1}`;
        temp5.textContent = `${(temp - 273.15).toFixed(0)}°C`;
        humidity5.textContent = `Humidity: ${humidity}%`;
        desc5.textContent = description;
        div.append(h3, temp5, humidity5, desc5);
        forecastBlocks.append(div);
        switch (true) {
            case id >= 200 &&  id < 300: 
                div.querySelectorAll('*').forEach(elem => elem.style.color = white_color); 
                break;
            case id >= 300 && id < 400 || id >= 500 &&  id < 600: 
                div.querySelectorAll('*').forEach(elem => elem.style.color = white_color);
                break;
            case id >= 600 &&  id < 700: 
                div.querySelectorAll('*').forEach(elem => elem.style.color = grey_color); 
                break;
            case id >= 700 &&  id < 800: 
                div.querySelectorAll('*').forEach(elem => elem.style.color = grey_color); 
                break;
            case id == 800: 
                div.querySelectorAll('*').forEach(elem => elem.style.color = white_color);
                break;
            case id >= 801: 
                div.querySelectorAll('*').forEach(elem => elem.style.color = white_color);
                break;
        }
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
    getWeatherData(city);
})

