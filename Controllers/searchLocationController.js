import { API_KEY } from "../config.js";
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
        `<li>${item.name + ", " + item.state + ", " + item.country} </li>`
    );
    const joinedList = list.join("");
    cityList.innerHTML = joinedList;
  } catch (error) {
    console.error(error);
  }
};
