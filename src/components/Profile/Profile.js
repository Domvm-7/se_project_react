import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({ onCreateModal, item, onSelectCard }) => {
  return (
    <div>
      <SideBar />
      <h3>Your Items</h3>
      <button className="profile__button" type="text" onClick={onCreateModal}>
        + Add New
      </button>
      <ClothesSection item={item} onSelectCard={onSelectCard} />
    </div>
  );
};

export default Profile;
