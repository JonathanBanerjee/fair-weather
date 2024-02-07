import { getLocation } from "./Controllers/getLocationController.js";
import { getWeather } from "./Controllers/weatherController.js";
import { getSunrise, getSunset } from "./Controllers/sunController.js";
import { getCity } from "./Controllers/getCityController.js";

const coordsRef = document.getElementById("coords");
const cityRef = document.getElementById("city");
const weatherRef = document.getElementById("weather");
const button = document.getElementById("getLocation");

button.addEventListener("click", () => clickHandler());

const clickHandler = async () => {
  try {
    const coords = await getLocation();
    const city = await getCity(coords);
    const weather = await getWeather(coords);
    const sunrise = await getSunrise(coords);
    const sunset = await getSunset(coords);
    cityRef.innerHTML = city;
    // weatherRef.innerHTML = weather;
    console.log(weather);
    console.log(sunrise);
    console.log(sunset);
  } catch (error) {
    console.log(error, "reason");
  }
};

// const searchHandler = async (city) => {
//   try {
//     cityRef.innerHTML = city;
//   } catch (error) {}
// };
