import { API_KEY } from "../config.js";
import { getWeather } from "./weatherController.js";
import { getCity } from "./getCityController.js";
import { getSunrise, getSunset, getDatetime } from "./sunController.js";

const cityList = document.getElementById("city-list");
const city = document.getElementById("city");
const dayList = document.getElementById("daylist");
const backButton = document.getElementById("back-button");
const initialDisplay = document.getElementById("initialdisplay");
const sunriseRef = document.getElementById("sunrise");
const sunsetRef = document.getElementById("sunset");

// Function to handle the user's input when searching for a city
export const inputHandler = async (userInput) => {
  console.log("Input handler ran");
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${API_KEY}`
    );

    const list = data.map(
      (item) =>
        `<li data-lon="${item.lon}" data-lat="${item.lat}">${
          item.name + ", " + item.state + ", " + item.country
        } </li>`
    );

    const joinedList = list.join("");
    cityList.innerHTML = joinedList;
  } catch (error) {
    console.error(error);
  }
};

// Event listener for when an item from the list of cities is clicked
cityList.addEventListener("click", async function (e) {
  if (e.target.tagName.toLowerCase() === "li") {
    const latitude = e.target.getAttribute("data-lat");
    const longitude = e.target.getAttribute("data-lon");

    const coords = { latitude, longitude };
    const sunrise = await getSunrise(coords);
    const sunset = await getSunset(coords);
    const datetime = await getDatetime(sunrise, sunset);

    getWeather(coords);
    const cityName = await getCity({ latitude, longitude });
    cityList.innerHTML = "";
    city.innerHTML = cityName;
    dayList.style.display = "block";
    backButton.style.display = "block";
    initialDisplay.style.display = "none";
    sunriseRef.innerHTML = "Sunrise: " + datetime.sunriseString + " AM";
    sunsetRef.innerHTML = "Sunset: " + datetime.sunsetString + " PM";
  }
});
