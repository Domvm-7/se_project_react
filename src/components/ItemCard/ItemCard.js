import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <div className="card__name"> {item.name}</div>
        <img
          src={item.link}
          className="card__image"
          onClick={() => onSelectCard(item)}
          alt="item image"
        />
      </div>
    </div>
  );
};

export default ItemCard;
