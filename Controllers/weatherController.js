import { API_KEY, API_URL } from "../config.js";

export async function getWeather(coords) {
  try {
    const { data } = await axios.get(
      `${API_URL}/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`
    );

    if (data) {
      // console.log(data.list[2].weather);
      // console.log(data.list[2].weather[0].description);
      // console.log(data.list[8].weather);
      // console.log(data.list[8].weather[0].description);
      // return data.list.weather;
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
          console.log(
            date,
            dateCheck,
            mainWeather,
            weatherDesc,
            temperature,
            weatherIcon
          );
          noonDates.push({
            date: date,
            weather: mainWeather,
            weatherDesc: weatherDesc,
            temperature,
            weatherIcon,
          });
        }
      });
      return noonDates;
    }
  } catch (error) {
    console.error(error);
  }
}
