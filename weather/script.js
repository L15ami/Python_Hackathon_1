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

// function that fetches and displays the data from the weather API
function fetchWeatherData() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // add temperature and weather condition to the page
            temp.innerHTML = `${data.main.temp} &#176;C`; // Assuming temperature is in Celsius
            conditionOutput.innerHTML = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// call the function when the page loads
fetchWeatherData();