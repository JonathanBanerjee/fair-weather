import { API_KEY } from "../config.js";
import { getWeather } from "./weatherController.js";
import { getCity } from "./getCityController.js";

const cityList = document.getElementById("city-list");
const getLocationButton = document.getElementById("getLocation");
const getOr = document.getElementById("or");
const city = document.getElementById("city");

// Function to handle the user's input when searching for a city
export const inputHandler = async (userInput) => {
  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${API_KEY}`
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

// Event listener for when an item from the list of cities if clicked
cityList.addEventListener("click", async function (e) {
  if (e.target.tagName.toLowerCase() === "li") {
    const latitude = e.target.getAttribute("data-lat");
    const longitude = e.target.getAttribute("data-lon");

    getWeather({ latitude, longitude });
    const cityName = await getCity({ latitude, longitude });
    cityList.innerHTML = "";
    city.innerHTML = cityName;

    getLocationButton.classList.remove("getLocation", "getOr");
    getLocationButton.style.display = "none";
    getOr.style.display = "none";
  }
});
