// RegisterModal.js //
import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    onRegister(formData);
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        password: "",
        avatar: "",
      });
      setError(null); // Clear any existing errors when modal opens
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      buttonText="Register"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="register"
      title="Register"
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          value={formData.avatar}
          onChange={handleChange}
          required
        />
      </label>
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
};

export default RegisterModal;
