// Profile.js

import React, { useState, useContext } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

const Profile = ({
  onCreateModal,
  cards,
  onSelectCard,
  onAddItem,
  onSignOut,
  isLoggedIn,
  onCardLike,
  api, // Receive api instance
  onUpdateUserProfile, // Receive update profile function
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  return (
    <div className="profile__content">
      <SideBar
        onEditProfile={handleEditProfile}
        onSignOut={onSignOut}
        isLoggedIn={isLoggedIn}
      />
      <div className="profile__items">
        <h3 className="profile__items-your">Your Items</h3>
        {isLoggedIn && (
          <button
            className="profile__button"
            type="button"
            onClick={() => onCreateModal("create")}
          >
            + Add Clothes
          </button>
        )}
      </div>
      <ClothesSection
        items={cards.filter((card) => card.owner === currentUser._id)}
        onSelectCard={onSelectCard}
        onCardLike={onCardLike}
      />
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={handleCloseEditProfileModal}
        onUpdateUserProfile={onUpdateUserProfile} // Pass update profile function
      />
    </div>
  );
};

export default Profile;
