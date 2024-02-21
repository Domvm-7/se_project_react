import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    console.log(e.target.value);
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link });
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
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
          value={link}
          onChange={handleUrlChange}
        />
      </label>
      <div className="modal__weather">
        <p>Select Weather Type:</p>
        <div className="modal__weather-input">
          <input
            className="modal__weather-radio"
            type="radio"
            id="hot"
            value={weather}
            name="weatherType"
            onChange={handleWeatherChange}
          />
          <label className="modal__weather-label" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="modal__weather-input">
          <input
            className="modal__weather-radio"
            type="radio"
            id="warm"
            value={weather}
            name="weatherType"
            onChange={handleWeatherChange}
          />
          <label className="modal__weather-label" htmlFor="warm">
            Warm
          </label>
        </div>
        <div className="modal__weather-input">
          <input
            className="modal__weather-radio"
            type="radio"
            id="cold"
            value={weather}
            name="weatherType"
            onChange={handleWeatherChange}
          />
          <label className="modal__weather-label" htmlFor="cold">
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
