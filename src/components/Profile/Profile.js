import React from "react";
import "./Profile.css";

const Profile = ({ onCreateModal }) => {
  return (
    <div>
      <h3>Your Items</h3>
      <button className="profile__button" type="text" onClick={onCreateModal}>
        + Add New
      </button>
    </div>
  );
};

export default Profile;
