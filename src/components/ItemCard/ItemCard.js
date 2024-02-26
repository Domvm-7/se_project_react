import React from "react";
import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <div className="card__name">{item.name}</div>
        <img
          src={item.imageUrl} // Use item.imageUrl instead of item.link
          className="card__image"
          onClick={() => onSelectCard(item)}
          alt={item.name}
        />
      </div>
    </div>
  );
};

export default ItemCard;
