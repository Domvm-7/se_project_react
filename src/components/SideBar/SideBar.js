import React, { useContext } from "react";
import avatar from "../../images/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

const SideBar = ({ onEditProfile, onSignOut, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="avatar" />
      <h3 className="sidebar__name">
        {currentUser.name || "Dominic Martinez"}
      </h3>
      <div className="sidebar__buttons">
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
