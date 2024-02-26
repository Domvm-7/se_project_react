import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(selectedCard);
    onClose();
  };

  return (
    <div className={`modal`}>
      <div className="modal__content-item">
        <button
          className="modal__close-item"
          type="button"
          onClick={onClose}
        ></button>
        <img src={selectedCard.link} alt={selectedCard.name} />
        <div>{selectedCard.name}</div>
        <div> Weather type: {selectedCard.weather}</div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ItemModal;
