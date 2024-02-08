import { getLocation } from "./Controllers/getLocationController.js";
import { getWeather } from "./Controllers/weatherController.js";
import {
  getSunrise,
  getSunset,
  getDatetime,
} from "./Controllers/sunController.js";
import { getCity } from "./Controllers/getCityController.js";

const coordsRef = document.getElementById("coords");
const cityRef = document.getElementById("city");
const weatherRef = document.getElementById("weather");
const button = document.getElementById("getLocation");
const sunriseRef = document.getElementById("sunrise");
const sunsetRef = document.getElementById("sunset");

button.addEventListener("click", () => clickHandler());

const clickHandler = async () => {
  try {
    const coords = await getLocation();
    const city = await getCity(coords);
    const noonDates = await getWeather(coords);
    const sunrise = await getSunrise(coords);
    const sunset = await getSunset(coords);
    const datetime = await getDatetime(sunrise, sunset);
    cityRef.innerHTML = city;
    sunriseRef.innerHTML = "Sunrise: " + datetime.sunriseString + " AM";
    sunsetRef.innerHTML = "Sunset: " + datetime.sunsetString + " PM";
    weatherRef.innerHTML =
      noonDates[0].weatherDesc +
      " " +
      noonDates[1].weatherDesc +
      " " +
      noonDates[2].weatherDesc +
      " " +
      noonDates[3].weatherDesc +
      " " +
      noonDates[4].weatherDesc;
  } catch (error) {
    console.log("Reason:", error);
  }
};
