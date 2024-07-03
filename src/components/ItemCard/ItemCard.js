// ItemCard.js
import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);

  // Ensure item and item.likes are defined
  const isLiked = item?.likes?.includes(currentUser?._id) || false;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const itemLikeButton = `like-button ${isLiked ? "liked" : ""}`;

  return (
    <div>
      <div>
        <div className="card__name">{item?.name}</div>
        {item?.imageUrl && (
          <img
            src={item.imageUrl}
            className="card__image"
            onClick={() => onSelectCard(item)}
            alt={item.name}
          />
        )}
        {currentUser && (
          <button className={itemLikeButton} onClick={handleLike}>
            {isLiked ? "Unlike" : "Like"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
