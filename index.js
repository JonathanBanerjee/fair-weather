// Importing functions from the controllers
import { getLocation } from "./Controllers/getLocationController.js";
import { getWeather } from "./Controllers/weatherController.js";
import {
  getSunrise,
  getSunset,
  getDatetime,
} from "./Controllers/sunController.js";
import { getCity } from "./Controllers/getCityController.js";
import { inputHandler } from "./Controllers/searchLocationController.js";

//Obtaining DOM references and assigning them to a variable.
const cityRef = document.getElementById("city");
const button = document.getElementById("getLocation");
const sunriseRef = document.getElementById("sunrise");
const sunsetRef = document.getElementById("sunset");
const input = document.getElementById("location");
const dayList = document.getElementById("daylist");
const backButton = document.getElementById("back-button");
const initialDisplay = document.getElementById("initialdisplay");
const dayRefs = [
  document.getElementById("dayOne"),
  document.getElementById("dayTwo"),
  document.getElementById("dayThree"),
  document.getElementById("dayFour"),
  document.getElementById("dayFive"),
];

// Function to generate HTML for weather display
export const generateWeatherHTML = (dayInfo, weatherURL, firstDay) => {
  const day = firstDay
    ? dayInfo.weatherDesc.charAt(0).toUpperCase() + dayInfo.weatherDesc.slice(1)
    : dayInfo.date.toString().slice(0, 4);
  return `${day} ${dayInfo.temperature}°C 
    <img src="${weatherURL + dayInfo.weatherIcon + "@2x.png"}" /> `;
};

// Click event handler for the button
const clickHandler = async () => {
  try {
    const coords = await getLocation();
    const city = await getCity(coords);
    const noonDates = await getWeather(coords);
    const sunrise = await getSunrise(coords);
    const sunset = await getSunset(coords);
    const datetime = await getDatetime(sunrise, sunset);
    const weatherURL = "https://openweathermap.org/img/wn/";
    cityRef.innerHTML = city;
    sunriseRef.innerHTML = "Sunrise: " + datetime.sunriseString + " AM";
    sunsetRef.innerHTML = "Sunset: " + datetime.sunsetString + " PM";

    console.log(noonDates);
    // Update weather information for each day
    noonDates.forEach((dayInfo, i) => {
      const dayRef = dayRefs[i];
      const firstDay = i === 0;
      dayRef.innerHTML = generateWeatherHTML(dayInfo, weatherURL, firstDay);

      // Displaying and hiding HTML elements
      dayList.style.display = "block";
      backButton.style.display = "block";
      initialDisplay.style.display = "none";
    });
  } catch (error) {
    console.log("Reason:", error);
  }
};

//Event Listeners
input.addEventListener("input", (e) => inputHandler(e.target.value));
button.addEventListener("click", clickHandler);
document.getElementById("back-button").addEventListener("click", () => {
  location.reload();
});
