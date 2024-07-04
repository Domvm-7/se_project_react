import React, { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemModal = ({ selectedCard, onClose, onDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser?._id;
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;

  const handleDelete = () => {
    onDelete(selectedCard);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal__content-item">
        <button
          className="modal__close-item"
          type="button"
          onClick={onClose}
        ></button>
        <img src={selectedCard.imageUrl} alt={selectedCard.name} />
        <div className="modal__item-card-content">
          <div>
            <div className="modal__card-name">{selectedCard.name}</div>
            <div className="modal__card-name">
              {" "}
              Weather type: {selectedCard.weather}
            </div>
          </div>
          {isOwn && (
            <button
              className={itemDeleteButtonClassName}
              onClick={handleDelete}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
