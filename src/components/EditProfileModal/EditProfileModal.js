// EditProfileModal.jsx //
import React, { useContext, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, onUpdateUserProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  useEffect(() => {
    setName(currentUser?.name || "");
    setAvatar(currentUser?.avatar || "");
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUserProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Edit Profile"
      buttonText="Save"
      name="edit-profile"
    >
      <label className="modal__label">
        Name:
        <input
          className="modal__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL:
        <input
          className="modal__input"
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
