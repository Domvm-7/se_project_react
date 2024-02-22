import React from "react";
import "./ClothesSection.css";

const ClothesSection = ({ item, onSelectCard }) => (
  <div>
    {item && (
      <>
        <div className="card__name">{item.name}</div>
        <img
          src={item.link}
          className="card__image"
          onClick={() => onSelectCard(item)}
          alt={item.name}
        />
      </>
    )}
  </div>
);

export default ClothesSection;
