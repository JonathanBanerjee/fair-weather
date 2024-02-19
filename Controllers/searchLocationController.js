// const CITY_URL = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`;
// import { API_KEY } from "../config";
const cityList = document.getElementById("city-list");
export const inputHandler = async (userInput) => {
  console.log(userInput);

  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=7e0d6928eed4d376da50312f8d85e6ca`
    );
    console.log(data);
    const list = data.map((item) => `<li>${item.name}</li>`);
    const joinedList = list.join("");
    cityList.innerHTML = joinedList;
  } catch (error) {
    console.error(error);
  }
};
