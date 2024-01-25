import { defaultClothingItems } from "../util/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ weatherTemp, onSelectCard }) {
  return (
    <main className="main">
      <WeatherCard day={true} type="cloudy" weatherTemp={weatherTemp} />
      <section className="card__section" id="card-section">
        Today is {weatherTemp} / You may want to wear:
        <div className="card__items">
          {defaultClothingItems.map((item) => (
            <ItemCard item={item} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
