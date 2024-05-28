import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Header = ({ onCreateModal }) => {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div>{currentDate}</div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <button className="header__button" type="text" onClick={onCreateModal}>
          + Add Clothes
        </button>
        {currentUser ? (
          <>
            <Link to="/profile" className="header__name">
              {currentUser.name}
            </Link>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="avatar"
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            )}
          </>
        ) : (
          <nav className="header__nav">
            <button
              className="header__button"
              onClick={() => onCreateModal("login")}
            >
              Log In
            </button>
            <button
              className="header__button"
              onClick={() => onCreateModal("register")}
            >
              Register
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
