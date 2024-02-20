import { API_KEY } from "../config.js";
import { getWeather } from "./weatherController.js";

const cityList = document.getElementById("city-list");
export const inputHandler = async (userInput) => {
  console.log(userInput);

  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${API_KEY}`
    );
    console.log(data);

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

cityList.addEventListener("click", function (e) {
  if (e.target.tagName.toLowerCase() === "li") {
    const latitude = e.target.getAttribute("data-lat");
    const longitude = e.target.getAttribute("data-lon");

    getWeather({ latitude, longitude });
    cityList.innerHTML = "";

    //Placeholder of what I have to do with regards to hiding and revealing
    goLight.classList.remove("on");
  }
});
