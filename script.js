// key: PFBSKHCPBB9L3B62FZBHZN46T

async function fetchWeather(location) {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=PFBSKHCPBB9L3B62FZBHZN46T`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const processedData = {
            address: data.resolvedAddress,
            temp: data.currentConditions.temp,
            feelslike: data.currentConditions.feelslike,
            humidity: data.currentConditions.humidity,
            precipitation: data.currentConditions.precip,
            windSpeed: data.currentConditions.windspeed,
            sunrise: data.currentConditions.sunrise,
            sunset: data.currentConditions.sunset,
            icon: data.currentConditions.icon,
            time: data.currentConditions.datetime,
            condition: data.currentConditions.conditions,
            forecast: data.days.map((day) => ({
                date: day.datetime,
                temp: day.temp,
                tempmin: day.tempmin,
                tempmax: day.tempmax,
                icon: day.icon,
            })),
        };

        return processedData; // Return the processed data
    } catch (error) {
        console.log("Error:", error);
        throw error; // Propagate the error for handling outside the function
    }
}

const locationForm = document.getElementById('locationForm')
const submitBtn = document.getElementById('submit-btn')

locationForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const location = document.getElementById('location').value.trim()
    const data = await fetchWeather(location)
    displayWeather(data)
    console.log(data)
})

function displayWeather(data) {
    const container = document.getElementById('weatherResult')
    let forecastHTML = ''; // Initialize an empty string to store forecast HTML

    data.forecast.forEach((day) => {
        forecastHTML += `
            <div class = "forecast-item">
                <div id = "forecast-date">${day.date}</div>
                <div id = "forecast-icon"><img src="WeatherIcons/PNG/1st Set - Color/${day.icon}.png" alt="Weather icon"></div>
                <div id="forecast-details">
                    <div>${day.tempmin}°</div>
                    <div>${day.tempmax}°</div>
                </div>
            </div>
        `;
    });

    weatherResult.innerHTML = `
    <div class="container">
        <h1>${data.address}</h1>
        <div id = "container-1">
            <img src="WeatherIcons/PNG/1st Set - Color/${data.icon}.png" id = "weather-icon">
            <div id = "temp">${data.temp} °F</div>
            <div id = "weather-details">
                <div>Precipitation: ${data.precipitation}</div>
                <div>Wind: ${data.windSpeed}km/h</div>
                <div>Humidity: ${data.humidity}%</div>
            </div>
            <div id = "date-time">
                <div>Weather</div>
                <div>${data.time}</div>
                <div>${data.condition}</div>
            </div>
        </div>
        <div id = "sun-timings">
            <div>Sunrise: ${data.sunrise}</div>
            <div>Sunset: ${data.sunset}</div>
        </div>
        <div id = "forecast-container">
            ${forecastHTML}
        </div>   
    </div>
    `
}