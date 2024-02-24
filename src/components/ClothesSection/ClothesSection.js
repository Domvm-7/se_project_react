import React from "react";
import "./ClothesSection.css";

const ClothesSection = ({ items = [], onSelectCard }) => (
  <div className="clothes-section">
    {items &&
      items.map((item, index) => (
        <div key={index} className="clothes-section__item">
          <div className="card__name">{item.name}</div>
          <img
            src={item.link}
            className="card__image"
            onClick={() => onSelectCard(item)}
            alt={item.name}
          />
        </div>
      ))}
  </div>
);

export default ClothesSection;
