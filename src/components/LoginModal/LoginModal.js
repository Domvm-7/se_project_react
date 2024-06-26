import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData, (err) => {
      if (err) {
        setError(err.message);
      } else {
        onClose();
      }
    });
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({ email: "", password: "" });
      setError(null); // Clear previous error messages
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      buttonText="Login"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="login"
      title="Login"
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
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
        />
      </label>
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
};

export default LoginModal;
