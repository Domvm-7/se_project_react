// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

import { processServerResponse } from "./utils";

const latitude = 44.34;
const longitude = 10.99;
const APIkey = "44144797a1ad325e00632a79b6a7b831";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then(processServerResponse)
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;

  const weather = {
    temperature: {
      F: `${Math.round(temperature)}°F`,
      C: `${Math.round(((temperature - 32) * 5) / 9)}°C`,
    },
  };
  console.log(weather);
  return weather;
};
