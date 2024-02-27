import React, { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ weatherTemp, onSelectCard, cards }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
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

  const filteredCards = cards.filter(
    (item) => item.weather.toLowerCase() === weatherType
  );

  return (
    <main className="main">
      <WeatherCard day={true} type="cloudy" weatherTemp={temp} />
      <section className="card__section" id="card-section">
        Today is {temp} / You may want to wear:
        <div className="card__items">
          {filteredCards.map((item) => (
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
