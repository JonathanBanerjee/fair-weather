import { API_KEY, API_URL } from "../config.js";

export async function getSunrise(coords) {
  try {
    const { data } = await axios.get(
      `${API_URL}/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`
    );

    if (data && data.city) {
      const sunrise = data.city.sunrise;
      return sunrise;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getSunset(coords) {
  try {
    const { data } = await axios.get(
      `${API_URL}/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`
    );

    if (data && data.city) {
      const sunset = data.city.sunset;
      return sunset;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getDatetime(sunrise, sunset) {
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);

  const sunriseString = sunriseDate.toLocaleString().slice(11);
  const sunsetString = sunsetDate.toLocaleString().slice(11);

  return { sunriseString, sunsetString };
}
