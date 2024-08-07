// ClothesSection.js

import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ClothesSection = ({ items = [], onSelectCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  const userItems = items.filter((item) => item.owner === currentUser?._id);

  return (
    <div className="clothes-section">
      {userItems.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onSelectCard={onSelectCard}
          onCardLike={onCardLike} // Pass onCardLike to ItemCard
        />
      ))}
    </div>
  );
};

export default ClothesSection;
