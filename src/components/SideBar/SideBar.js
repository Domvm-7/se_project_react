import React, { useContext } from "react";
import avatar from "../../images/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

const SideBar = ({ onEditProfile, onSignOut, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        {currentUser && currentUser.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt="avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser && currentUser.name
              ? currentUser.name.charAt(0).toUpperCase()
              : "A"}
          </div>
        )}
        <h3 className="sidebar__name">
          {currentUser.name || "Dominic Martinez"}
        </h3>
      </div>
      <div className="sidebar__bottom">
        {isLoggedIn && (
          <>
            <button
              className="sidebar__edit-button"
              type="button"
              onClick={onEditProfile}
            >
              Edit Profile
            </button>
            <button
              className="sidebar__signout-button"
              type="button"
              onClick={onSignOut}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
