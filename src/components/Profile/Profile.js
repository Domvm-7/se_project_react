import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({ onCreateModal, cards, onSelectCard }) => {
  return (
    <div>
      <SideBar />
      <div className="profile__items">
        <h3 className="profile__items-your">Your Items</h3>

        <button
          className="profile_profile__button"
          type="text"
          onClick={onCreateModal}
        >
          + Add New
        </button>
      </div>
      {/* Render cards here */}
      {cards.map((card) => (
        <ClothesSection
          key={card._id}
          item={card}
          onSelectCard={onSelectCard}
        />
      ))}
    </div>
  );
};

export default Profile;
