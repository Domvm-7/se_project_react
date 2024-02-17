import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(currentTemperatureUnit);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit];
  const weatherType = useMemo(() => {
    const numericTemp = parseInt(temp);
    if (!isNaN(numericTemp)) {
      if (numericTemp >= 86) {
        return "hot";
      } else if (numericTemp >= 66 && numericTemp <= 85) {
        return "warm";
      } else if (numericTemp <= 65) {
        return "cold";
      }
    }
    return "unknown";
  }, [weatherTemp]);

  console.log(weatherType);

  const filteredCards = defaultClothingItems.filter((item) => {
    console.log(item);
    return item.weather.toLowerCase() === weatherType;
  });

  console.log(filteredCards);

  return (
    <main className="main">
      <WeatherCard day={true} type="cloudy" weatherTemp={temp} />
      <section className="card__section" id="card-section">
        Today is {temp} / You may want to wear:
        <div className="card__items">
          {filteredCards.map((item, _id) => (
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
