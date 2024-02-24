import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const [link, setUrl] = useState("");
  const [weather, setWeather] = useState("");

  // Handle changes for name input
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle changes for URL input
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  // Handle changes for weather input
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link });
  };

  // Reset state values when modal is opened
  useEffect(() => {
    if (isOpen) {
      setName("");
      setUrl("");
      setWeather("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      buttonText="New Garment"
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
            value="hot"
            name="weatherType"
            checked={weather === "hot"}
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
            value="warm"
            name="weatherType"
            checked={weather === "warm"}
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
            value="cold"
            name="weatherType"
            checked={weather === "cold"}
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
