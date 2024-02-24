import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { parseWeatherData, getForecastWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import api from "../../utils/api";
import Profile from "../Profile/Profile";

function App() {
  const [cards, setCards] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleRemoveCard = (cardToRemove) => {
    setCards(cards.filter((card) => card !== cardToRemove));
  };

  const onAddItem = (values) => {
    api
      .addItem(values.name, values.imageUrl, values.weather)
      .then(() => {
        console.log("Item added successfully");
        handleCloseModal();
        setCards([
          ...cards,
          {
            name: values.name,
            imageUrl: values.imageUrl,
            weather: values.weather,
          },
        ]);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    api
      .getItems()
      .then((items) => {
        console.log("Fetched items:", items);
        setCards(items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        console.log(temperature);
        setTemp(temperature);
      })
      .catch((error) => {
        console.error("Error fetching forecast weather:", error);
      });
  }, []);

  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              cards={cards}
              onRemoveCard={handleRemoveCard}
            />
          </Route>
        </Switch>
        <Route path="/profile" component={Profile}></Route>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
