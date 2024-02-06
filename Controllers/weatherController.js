import { API_KEY, API_URL } from "../config";
import { getLocation } from "./getLocationController";

export async function getApiData(coords) {
  try {
    const { data } = await axios.get(
      `${API_URL}/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`
    );

    if (data && data.city) {
      const cityName = data.city.name;
      cityRef.innerHTML = `<h2> ${cityName}</h2>`;
    } else {
      cityRef.innerHTML = `<h2>Location name not available</h2>`;
    }
  } catch (error) {
    console.error(error);
  }
}
