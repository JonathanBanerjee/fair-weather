import { getLocation } from "./Controllers/getLocationController.js";
import { getWeather } from "./Controllers/weatherController.js";
import {
  getSunrise,
  getSunset,
  getDatetime,
} from "./Controllers/sunController.js";
import { getCity } from "./Controllers/getCityController.js";

const cityRef = document.getElementById("city");
const button = document.getElementById("getLocation");
const sunriseRef = document.getElementById("sunrise");
const sunsetRef = document.getElementById("sunset");

const dayRefs = [
  document.getElementById("dayOne"),
  document.getElementById("dayTwo"),
  document.getElementById("dayThree"),
  document.getElementById("dayFour"),
  document.getElementById("dayFive"),
];

const generateHTML = (dayInfo, weatherURL, firstDay) => {
  if (firstDay) {
    return `
    ${dayInfo.weatherDesc} 
    ${dayInfo.temperature}°C 
    <img src="${weatherURL + dayInfo.weatherIcon + "@2x.png"}" />
  `;
  } else {
    return `
    ${dayInfo.date.toString().slice(0, 4)}
    ${dayInfo.temperature}°C 
    <img src="${weatherURL + dayInfo.weatherIcon + "@2x.png"}" /> `;
  }
};

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

    noonDates.forEach((dayInfo, i) => {
      const dayRef = dayRefs[i];
      const firstDay = i === 0;
      dayRef.innerHTML = generateHTML(dayInfo, weatherURL, firstDay);
    });
  } catch (error) {
    console.log("Reason:", error);
  }
};

button.addEventListener("click", clickHandler);
