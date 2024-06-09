const city_name = document.getElementById("city_name");
const btn = document.getElementById("submit-btn");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");
const day = document.getElementById("day");
const today_date = document.getElementById("today_date");

// Function to get weather icon URL
const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

const getinfo = async (event) => {
    event.preventDefault();
    let city_temp = city_name.value;
    if (city_temp === "") {
        city.innerHTML = "Please enter a valid city name";
        
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_temp}&appid=0e22561beaabb1e198fb30484d34c1ff`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            
            // Display city and country
            city.innerHTML = `${data.name}, ${data.sys.country}`;
            
            // Display temperature in Celsius
            temp.innerHTML = `${(data.main.temp - 273.15).toFixed(2)} °C`;
            
            // Get weather icon
            const iconCode = data.weather[0].icon;
            temp_status.innerHTML = `<img src="${getWeatherIcon(iconCode)}" alt="${data.weather[0].description}" />`;
            
            // Get current date
            const currentDate = new Date();
            
            // Display day
            const options = { weekday: 'long' };
            day.innerHTML = new Intl.DateTimeFormat('en-US', options).format(currentDate);
            
            // Display date
            today_date.innerHTML = currentDate.toDateString();
        } catch (error) {
            city.innerHTML = `Error: ${error.message}`;
            
        }
    }
}

btn.addEventListener("click", getinfo);
