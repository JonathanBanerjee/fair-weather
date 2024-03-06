import { API_KEY, API_URL } from "../config.js";
import { generateWeatherHTML } from "../index.js";

const dayRefs = [
  document.getElementById("dayOne"),
  document.getElementById("dayTwo"),
  document.getElementById("dayThree"),
  document.getElementById("dayFour"),
  document.getElementById("dayFive"),
];
const weatherURL = "https://openweathermap.org/img/wn/";

export async function getWeather(coords) {
  console.log("get weather ran", coords);
  try {
    const { data } = await axios.get(
      `${API_URL}/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`
    );

    console.log(data);
    if (data) {
      const noonDates = [];
      data.list.forEach((i) => {
        const reading = i.dt * 1000;
        const date = new Date(reading);
        const dateCheck = date.getUTCHours();
        let mainWeather = i.weather[0].main;
        let weatherDesc = i.weather[0].description;
        let temperature = Math.round(i.main.temp - 273.15);
        let weatherIcon = i.weather[0].icon;

        if (dateCheck === 12) {
          noonDates.push({
            date: date,
            weather: mainWeather,
            weatherDesc: weatherDesc,
            temperature,
            weatherIcon,
          });
        }
      });
      // return noonDates;
      noonDates.forEach((dayInfo, i) => {
        const dayRef = dayRefs[i];
        const firstDay = i === 0;
        dayRef.innerHTML = generateWeatherHTML(dayInfo, weatherURL, firstDay);
      });
      return noonDates;
    }
  } catch (error) {
    console.error(error);
  }
}
