import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({ onCreateModal, item, onSelectCard }) => {
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
      <ClothesSection item={item} onSelectCard={onSelectCard} />
    </div>
  );
};

export default Profile;
