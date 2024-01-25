import logo from "./logo.svg";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Components/Footer/Footer";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "./ItemModal/ItemModal";
import { ParseWeatherData, getForecastWeather } from "./utils/weatherApi";

function App() {
  const weatherTemp = "75°F";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);

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

  useEffect(() => {
    getForecastWeather().then((data) => {
      const temperature = ParseWeatherData(data);
      setTemp(temperature);
    });
  }, []);
  console.log(temp);

  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm title="New Garment" onClose={handleCloseModal}>
          <label className="modal__label">
            Name
            <input
              className="modal__input"
              type="text"
              name="name"
              minLength="1"
              maxLength="30"
              placeholder="Name"
            />
          </label>
          <label className="modal__label">
            Image
            <input
              className="modal__input"
              type="url"
              name="link"
              minLength="1"
              maxLength="30"
              placeholder="Image Url"
            />
          </label>
          <div className="modal__weather">
            <p>Select Weather Type:</p>
            <div className="modal__weather-input">
              <input
                className="modal__weather-radio"
                type="radio"
                id="hot"
                value="hot"
              />
              <label className="modal__weather-label">Hot</label>
            </div>
            <div className="modal__weather-input">
              <input
                className="modal__weather-radio"
                type="radio"
                id="warm"
                value="warm"
              />
              <label className="modal__weather-label">Warm</label>
            </div>
            <div className="modal__weather-input">
              <input
                className="modal__weather-radio"
                type="radio"
                id="cold"
                value="cold"
              />
              <label className="modal__weather-label">Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
