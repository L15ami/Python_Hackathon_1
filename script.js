const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.querySelector(".locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelector(".city");

// default city when the page loads
let cityInput = "London";

// add click event to each city in the panel
cities.forEach((city) => {
    city.addeventListener("click", (e) => {
        // change from default city to the clicked one
        cityInput = e.target.innerHTML;

        fetchWeatherData();
        app.style.opacity = "0"
    });
})

// add submit event to the form
form.addEventListener("submit", (e) =>{
    
})


