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
const dayOneRef = document.getElementById("dayOne");
const dayTwoRef = document.getElementById("dayTwo");
const dayThreeRef = document.getElementById("dayThree");
const dayFourRef = document.getElementById("dayFour");
const dayFiveRef = document.getElementById("dayFive");

button.addEventListener("click", () => clickHandler());

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
    dayOneRef.innerHTML =
      noonDates[0].weatherDesc +
      " " +
      noonDates[0].temperature +
      "°C " +
      " " +
      `<img src="${weatherURL + noonDates[0].weatherIcon + "@2x.png"}"</img>`;

    dayTwoRef.innerHTML =
      noonDates[1].date.toString().slice(0, 4) +
      " " +
      noonDates[1].temperature +
      "°C " +
      `<img src="${weatherURL + noonDates[1].weatherIcon + "@2x.png"}"</img>`;

    dayThreeRef.innerHTML =
      noonDates[2].date.toString().slice(0, 4) +
      noonDates[2].temperature +
      "°C " +
      `<img src="${weatherURL + noonDates[2].weatherIcon + "@2x.png"}"</img>`;

    dayFourRef.innerHTML =
      noonDates[3].date.toString().slice(0, 4) +
      noonDates[3].temperature +
      "°C " +
      `<img src="${weatherURL + noonDates[3].weatherIcon + "@2x.png"}"</img>`;

    dayFiveRef.innerHTML =
      noonDates[4].date.toString().slice(0, 4) +
      noonDates[4].temperature +
      "°C " +
      `<img src="${weatherURL + noonDates[4].weatherIcon + "@2x.png"}"</img>`;
  } catch (error) {
    console.log("Reason:", error);
  }
};
