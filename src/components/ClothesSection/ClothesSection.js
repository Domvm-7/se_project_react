import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ items = [], onSelectCard }) => (
  <div className="clothes-section">
    {items &&
      items.map((item, index) => (
        <ItemCard key={index} item={item} onSelectCard={onSelectCard} />
      ))}
  </div>
);

export default ClothesSection;
