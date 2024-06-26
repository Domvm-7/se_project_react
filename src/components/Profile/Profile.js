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
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };
  console.log({ isLoggedIn });
  return (
    <div className="profile__content">
      <SideBar />
      <div className="profile__items">
        <h3 className="profile__items-your">Your Items</h3>
        {isLoggedIn && (
          <>
            <button
              className="profile__button"
              type="button"
              onClick={() => onCreateModal("create")}
            >
              + Add Clothes
            </button>
            <button
              className="profile__edit-button"
              type="button"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
            <button
              className="profile__signout-button"
              type="button"
              onClick={onSignOut}
            >
              Sign Out
            </button>
          </>
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
      />
    </div>
  );
};

export default Profile;
