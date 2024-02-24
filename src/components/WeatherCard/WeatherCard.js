import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  console.log("weather card");
  const weatherOption = weatherOptions.find((option) => {
    console.log(option);
    return option.day === day && option.type === type;
  });
  console.log(weatherOption);
  console.log(weatherOption.url);

  const imageSrcUrl = weatherOption.url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather__info">{weatherTemp} </div>
      <img className="weather__image" src={imageSrcUrl} alt="weather image" />
    </section>
  );
};

export default WeatherCard;
