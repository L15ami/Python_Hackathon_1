// Récupère les éléments du DOM
const cityName = document.querySelector('.name');
const temperature = document.querySelector('.temp');
const weatherCondition = document.querySelector('.condition');
const weatherIcon = document.querySelector('.icon');
const searchForm = document.getElementById('location-input');
const searchInput = document.querySelector('.search');
const detailsList = document.querySelector('.details');

// Clé d'API OpenWeatherMap
const apiKey = '1394dc5da9b39c5aed3eddf87f8dfec7'; // Remplace par ta clé d'API

// Évite le rechargement de la page lors de la soumission du formulaire
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = searchInput.value;
  console.log(city);
  getWeather(city);
});
const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        // Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });
         // Clearing previous weather data
         searchForm.value = "";
         console.log(searchForm.value);
        //  currentWeatherDiv.innerHTML = "";
        //  weatherCardsDiv.innerHTML = "";
         // Creating weather cards and adding them to the DOM
         fiveDaysForecast.forEach((weatherItem, index) => {
             const html = createWeatherCard(cityName, weatherItem, index);
             if (index === 0) {
                 currentWeatherDiv.insertAdjacentHTML("beforeend", html);
             } else {
                 weatherCardsDiv.insertAdjacentHTML("beforeend", html);
             }
         });
     }).catch(() => {
         alert("An error occurred while fetching the weather forecast!");
     });
 }

// Fonction pour obtenir les données météorologiques
async function getWeather(city) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Fonction pour afficher les données météorologiques dans l'interface utilisateur
function displayWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${data.main.temp} °C`;
  weatherCondition.textContent = data.weather[0].description;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  // Affichage des détails supplémentaires (exemple : nuages, humidité, vent)
  const details = [
    { name: 'Cloudiness', value: `${data.clouds.all}%` },
    { name: 'Humidity', value: `${data.main.humidity}%` },
    { name: 'Wind', value: `${data.wind.speed} km/h` }
  ];

  detailsList.innerHTML = '';
  details.forEach(detail => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${detail.name}</span>
      <span class="${detail.name.toLowerCase()}">${detail.value}</span>
    `;
    detailsList.appendChild(listItem);
  });
}

// Affiche initialement les données météorologiques pour une ville (ex. London)
// getWeather(); // Remplace par la ville par défaut que tu souhaites afficher initialement
