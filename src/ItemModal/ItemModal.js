import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content-item">
        <button
          className="modal__close-item"
          type="button"
          onClick={onClose}
        ></button>
        <img src={selectedCard.link} />
        <div>{selectedCard.name}</div>
        <div> Weather type: {selectedCard.weather}</div>
      </div>
    </div>
  );
};

export default ItemModal;
