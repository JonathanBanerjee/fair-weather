import { API_KEY, API_URL } from "../config.js";

export async function getCity(coords) {
  try {
    const { data } = await axios.get(
      `${API_URL}/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`
    );

    if (data && data.city) {
      return data.city.name;
    }
  } catch (error) {
    console.error(error);
  }
}
