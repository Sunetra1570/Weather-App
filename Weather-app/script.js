// Samsung Weather App - JavaScript
const apiKey = '70b6235e5495437f559746f91a9e99b7';

// DOM Elements
const cityInput = document.getElementById('city');
const emptyState = document.getElementById('emptyState');
const weatherContent = document.getElementById('weatherContent');
const loadingOverlay = document.getElementById('loadingOverlay');
const weatherBg = document.getElementById('weatherBg');

// Weather display elements
const cityName = document.getElementById('cityName');
const currentTime = document.getElementById('currentTime');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weatherDesc');
const tempHigh = document.getElementById('tempHigh');
const tempLow = document.getElementById('tempLow');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const windDir = document.getElementById('windDir');
const windArrow = document.getElementById('windArrow');
const visibility = document.getElementById('visibility');
const feelsLike = document.getElementById('feelsLike');
const pressure = document.getElementById('pressure');
const uvIndex = document.getElementById('uvIndex');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const hourlyForecast = document.getElementById('hourlyForecast');
const humidityBar = document.getElementById('humidityBar');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
    
    cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
});

// Handle search button click
function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
}

function updateCurrentTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        hour: '2-digit', 
        minute: '2-digit'
    };
    const timeString = now.toLocaleString('en-US', options);
    if (currentTime) {
        currentTime.textContent = timeString;
    }
}

function getWeather(city) {
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    showLoading();

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    Promise.all([
        fetch(currentWeatherUrl).then(res => res.json()),
        fetch(forecastUrl).then(res => res.json())
    ])
    .then(([currentData, forecastData]) => {
        hideLoading();
        
        if (currentData.cod === '404') {
            alert('City not found. Please try again.');
            return;
        }
        
        displayCurrentWeather(currentData);
        displayHourlyForecast(forecastData.list);
        updateWeatherBackground(currentData.weather[0].main.toLowerCase(), currentData.weather[0].icon);
        
        emptyState.style.display = 'none';
        weatherContent.classList.add('active');
    })
    .catch(error => {
        hideLoading();
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    });
}

function displayCurrentWeather(data) {
    // Location and time
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    updateCurrentTime();
    
    // Main weather info
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    weatherIcon.alt = data.weather[0].description;
    
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    weatherDesc.textContent = data.weather[0].description;
    
    tempHigh.textContent = `H: ${Math.round(data.main.temp_max)}°`;
    tempLow.textContent = `L: ${Math.round(data.main.temp_min)}°`;
    
    // Details
    humidity.textContent = `${data.main.humidity}%`;
    humidityBar.style.width = `${data.main.humidity}%`;
    
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    const windDegree = data.wind.deg || 0;
    windArrow.style.transform = `rotate(${windDegree}deg)`;
    windDir.textContent = getWindDirection(windDegree);
    
    visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°`;
    pressure.textContent = `${data.main.pressure} hPa`;
    uvIndex.textContent = '5'; // UV index not in free API
    
    // Sunrise and sunset
    const sunriseTime = new Date(data.sys.sunrise * 1000);
    const sunsetTime = new Date(data.sys.sunset * 1000);
    sunrise.textContent = formatTime(sunriseTime);
    sunset.textContent = formatTime(sunsetTime);
}

function displayHourlyForecast(forecastList) {
    hourlyForecast.innerHTML = '';
    
    // Get next 8 forecast items (24 hours with 3-hour intervals)
    const next24Hours = forecastList.slice(0, 8);
    
    next24Hours.forEach(item => {
        const time = new Date(item.dt * 1000);
        const hour = time.getHours();
        const temp = Math.round(item.main.temp);
        const iconCode = item.weather[0].icon;
        
        const hourlyItem = document.createElement('div');
        hourlyItem.className = 'hourly-item-card';
        hourlyItem.innerHTML = `
            <div class="hourly-time">${hour === 0 ? '12 AM' : hour < 12 ? hour + ' AM' : hour === 12 ? '12 PM' : (hour - 12) + ' PM'}</div>
            <div class="hourly-icon">
                <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather">
            </div>
            <div class="hourly-temp">${temp}°</div>
        `;
        
        hourlyForecast.appendChild(hourlyItem);
    });
}

function updateWeatherBackground(weatherMain, iconCode) {
    const sunContainer = document.querySelector('.sun-container');
    const rainContainer = document.querySelector('.rain-container');
    const cloudContainer = document.querySelector('.cloud-container');
    const starsContainer = document.querySelector('.stars-container');
    
    // Remove all active classes
    sunContainer.classList.remove('active');
    rainContainer.classList.remove('active');
    cloudContainer.classList.remove('active');
    starsContainer.classList.remove('active');
    
    // Remove all weather background classes
    weatherBg.className = 'weather-bg';
    
    const isNight = iconCode.includes('n');
    
    // Set background and animations based on weather
    if (weatherMain.includes('clear')) {
        if (isNight) {
            weatherBg.classList.add('clear-night');
            starsContainer.classList.add('active');
        } else {
            weatherBg.classList.add('clear-day');
            sunContainer.classList.add('active');
        }
    } else if (weatherMain.includes('cloud')) {
        weatherBg.classList.add('cloudy');
        cloudContainer.classList.add('active');
    } else if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
        weatherBg.classList.add('rainy');
        rainContainer.classList.add('active');
        cloudContainer.classList.add('active');
    } else if (weatherMain.includes('thunder')) {
        weatherBg.classList.add('stormy');
        rainContainer.classList.add('active');
        cloudContainer.classList.add('active');
    } else if (weatherMain.includes('snow')) {
        weatherBg.classList.add('cloudy');
        rainContainer.classList.add('active');
        cloudContainer.classList.add('active');
    } else if (weatherMain.includes('mist') || weatherMain.includes('fog') || weatherMain.includes('haze')) {
        weatherBg.classList.add('cloudy');
        cloudContainer.classList.add('active');
    }
}

function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
}

function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// Optional: Get user's location weather on load
function getUserLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        if (data.name) {
                            cityInput.value = data.name;
                            getWeather(data.name);
                        }
                    })
                    .catch(err => console.log('Could not get location weather'));
            },
            error => {
                console.log('Geolocation not available');
            }
        );
    }
}

// Uncomment to get weather for user's location on page load
// getUserLocationWeather();
