// const app = document.querySelector('.weather-app');
// const temp = document.querySelector('.temp');
// const dateOutput = document.querySelector('.date');
// const timeOutput = document.querySelector('.time');
// const conditionOutput = document.querySelector('.condition');
// const nameOutput = document.querySelector('.name');
// const icon = document.querySelector('.icon');
// const cloudOutput = document.querySelector('.cloud');
// const humidityOutput = document.querySelector('.humidity');
// const windOutput = document.querySelector('.wind');
// const form = document.querySelector('#location-input');
// const search = document.querySelector('.search');
// const btn = document.querySelector('.submit');
// const cities = document.querySelectorAll('.city');
// const apiKey = "1cf797c92f47eac76103910f1342e808"
// // defaut city when page loads
// let cityInput = "London";

// // add click event to each city in the pannel
// cities.forEach((city) => {
//     city.addEventListener('click', (e) => {
//         // change from default city to the click one
//         cityInput = e.target.textContent;
//         // call the function to get the weather data
//         fetchWeatherData();
//         app.style.opacity = "0";
//     });
// })

// // add submit event to the form
// form.addEventListener('submit', (e) => {
//     // if search bar is empty, throw an alert
//     if (search.Value.length == 0 ){
//         alert("Please enter a city name");
//     }else {
//         // change from default city to the input one
//         cityInput = search.value;
//         // call the function to get the weather data
//         fetchWeatherData();
//         search.value = "";
//         app.style.opacity = "0";
//     }
//     e.preventDefault();
// });

// // function that return a day of the week

// function dayOfTheWeek(day, month, year){
//     const weekday = [
//         "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
//     ];
//     return weekday [new Date(`${day}/${month}/${year}`).getDay()];
// };

// // function that fetches and display the data from the weather API

// function fetchWeatherData() {
//     fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//         // add temperature and weather condition to the page
//         temp.innerHTML = `${data.main.temp} &#176;c`;
//         conditionOutput.innerHTML = data.weather[0].description;
//         })
// }
// fetchWeatherData()





const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('#location-input');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const apiKey = "1cf797c92f47eac76103910f1342e808";
// default city when the page loads
let cityInput = "London";

// add click event to each city in the panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        // change from the default city to the clicked one
        cityInput = e.target.textContent;
        // call the function to get the weather data
        fetchWeatherData();
        app.style.opacity = "0";
    });
})

// add submit event to the form
form.addEventListener('submit', (e) => {
    // if the search bar is empty, throw an alert
    if (search.value.length == 0) {
        alert("Please enter a city name");
    } else {
        // change from the default city to the input one
        cityInput = search.value;
        // call the function to get the weather data
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

// function that returns a day of the week
function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    return weekday[new Date(`${year}-${month}-${day}`).getDay()];
};



function fetchWeatherData() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Convert temperature to Celsius
            const temperatureCelsius = (data.main.temp - 273.15).toFixed(2);

            // Update temperature, condition, and icon
            temp.innerHTML = `${temperatureCelsius} &#176;C`;
            conditionOutput.innerHTML = data.weather[0].description;
            icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            nameOutput.innerHTML = data.name;
            // Update date and time
            const date = new Date((data.dt + data.timezone) * 1000);
            dateOutput.innerHTML = `${dayOfTheWeek(date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear())} ${date.getUTCDate()} ${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)}`;

            const hours = date.getUTCHours().toString().padStart(2, '0');
            const minutes = date.getUTCMinutes().toString().padStart(2, '0');
            timeOutput.innerHTML = `${hours}:${minutes}`;


                // Get the weather condition and time of day
    const weatherCondition = data.weather[0].main.toLowerCase();

    const isDay = date.getUTCHours() >= 6 && date.getUTCHours() < 18;

    console.log('Weather Condition:', weatherCondition);
    console.log('Is Day:', isDay);

     // Determine the background image based on weather and time of day
     let backgroundImage;
     if (weatherCondition === 'clear' && isDay) {
         backgroundImage = 'url(./images/day/sunny.jpg)';
     } else if (weatherCondition === 'clouds' && isDay) {
         backgroundImage = 'url(./images/day/cloudy.jpg)';
     } else if (weatherCondition === 'rain') {
         backgroundImage = 'url(./images/rainy.jpg)';
     } else if (weatherCondition === 'snow') {
         backgroundImage = 'url(./images/snow.jpg)';
     } else if (weatherCondition === 'clear' && !isDay) {
         backgroundImage = 'url(./images/night/clear.jpg)';
     } else if (weatherCondition === 'clouds' && !isDay) {
         backgroundImage = 'url(./images/night/cloudy.jpg)';
     } else if (weatherCondition === 'rain') {
         backgroundImage = 'url(./images/night/rain.jpg)';
     } else if (weatherCondition === 'snow') {
         backgroundImage = 'url(./images/night/snow.jpg)';
     } else {
         // Default background image if no specific condition is matched
         backgroundImage = 'url(./images/night/bg.jpg)';
     }
 
     // Set the background image
     document.body.style.backgroundImage = backgroundImage;

  


            // Update other weather details
            cloudOutput.innerHTML = `${data.clouds.all}%`;
            humidityOutput.innerHTML = `${data.main.humidity}%`;
            windOutput.innerHTML = `${data.wind.speed} m/s`;

            // Update app visibility
            app.style.opacity = "1";
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}



// call the function when the page loads
fetchWeatherData();
