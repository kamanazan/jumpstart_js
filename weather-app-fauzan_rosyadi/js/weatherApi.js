import {API_KEY, BASE_URL} from "./config.js";

export function fetchWeather(city) {
  return fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error('Error fetching weather data:', error);
      throw new Error(error.message);
    });
}
