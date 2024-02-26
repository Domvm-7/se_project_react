import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { parseWeatherData, getForecastWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

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
    api
      .deleteItem(cardToRemove._id)
      .then(() => {
        setCards(cards.filter((card) => card !== cardToRemove));
        console.log("Card removed successfully from server.");
      })
      .catch((error) => {
        console.error("Error removing card from server:", error);
      });
  };

  const onAddItem = (values) => {
    api
      .addItem(values.name, values.imageUrl, values.weather)
      .then((response) => {
        if (response && response._id) {
          console.log("Item added successfully");
          handleCloseModal();
          setCards([...cards, response]);
        } else {
          console.error("Invalid response format:", response);
        }
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
          <Route path="/profile">
            <Profile
              onCreateModal={handleCreateModal}
              cards={cards}
              onSelectCard={handleSelectedCard}
              onAddItem={onAddItem}
            />
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            onDelete={handleRemoveCard}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
