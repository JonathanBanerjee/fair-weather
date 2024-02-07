import { API_KEY, API_URL } from "../config.js";

export async function getWeather(coords) {
  try {
    const { data } = await axios.get(
      `${API_URL}/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`
    );

    if (data) {
      console.log(data.list[2].weather);
      console.log(data.list[2].weather[0].description);
      console.log(data.list[8].weather);
      console.log(data.list[8].weather[0].description);
      // return data.list.weather;
    }
  } catch (error) {
    console.error(error);
  }
}
