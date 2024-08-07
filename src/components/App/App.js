// App.js //

import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import api from "../../utils/api"; // Import your api instance
import authApi, { getUserData, signIn, signUp } from "../../utils/auth";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ItemModal from "../ItemModal/ItemModal";
import { parseWeatherData, getForecastWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [cards, setCards] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

  const handleCreateModal = (modalType) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleRemoveCard = (cardToRemove) => {
    api
      .deleteItem(cardToRemove._id)
      .then(() => {
        setCards(cards.filter((card) => card !== cardToRemove));
        console.log("Card removed successfully from server.");
      })
      .catch((error) => {
        console.error("Error removing card from server:", error);
      });
  };

  const onAddItem = (values) => {
    api
      .addItem(values.name, values.imageUrl, values.weather)
      .then((response) => {
        if (response && response._id) {
          console.log("Item added successfully");
          handleCloseModal();
          setCards([...cards, response]);
        } else {
          console.error("Invalid response format:", response);
        }
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleRegister = (formData) => {
    signUp(formData.name, formData.email, formData.password, formData.avatar)
      .then((res) => {
        handleLogin({ email: formData.email, password: formData.password });
      })
      .catch((error) => {
        console.error("Error registering:", error);
      });
  };

  const handleLogin = (formData, onError) => {
    signIn(formData.email, formData.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          getUserData(res.token)
            .then((userData) => {
              setCurrentUser(userData);
              handleCloseModal();
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
              onError(error);
            });
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        onError(error);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleUpdateUserProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    return api
      .updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        console.log("User profile updated:", updatedUser);
        return updatedUser; // Return updatedUser to indicate success
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        throw error; // Throw error to propagate to caller for handling
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserData(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
          } else {
            setIsLoggedIn(false);
            setCurrentUser(null);
          }
        })
        .catch((error) => {
          console.error("Error checking user authentication:", error);
          setIsLoggedIn(false);
          setCurrentUser(null);
        })
        .finally(() => {
          setIsLoggedInLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setIsLoggedInLoading(false);
    }
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((items) => {
        console.log("Fetched items:", items);
        setCards(items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });

    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        console.log(temperature);
        setTemp(temperature);
      })
      .catch((error) => {
        console.error("Error fetching forecast weather:", error);
      });
  }, []);

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      api
        .addCardLike(id, token)
        .then((updatedCard) => {
          setCards((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .removeCardLike(id, token)
        .then((updatedCard) => {
          setCards((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  if (isLoggedInLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <div>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header onCreateModal={handleCreateModal} />
            <Switch>
              <Route exact path="/">
                <Main
                  weatherTemp={temp}
                  onSelectCard={handleSelectedCard}
                  cards={cards}
                  onRemoveCard={handleRemoveCard}
                  onCardLike={handleCardLike}
                />
              </Route>
              <Route path="/profile">
                {isLoggedIn ? (
                  <Profile
                    onCreateModal={handleCreateModal}
                    cards={cards}
                    onSelectCard={handleSelectedCard}
                    onAddItem={onAddItem}
                    onEditProfile={openEditProfileModal}
                    onCardLike={handleCardLike}
                    onSignOut={handleSignOut}
                    isLoggedIn={isLoggedIn} // Pass isLoggedIn as a prop here
                    api={api} // Pass api instance to Profile component
                    onUpdateUserProfile={handleUpdateUserProfile} // Pass update profile function
                  />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>
            </Switch>
            <Footer />
            {activeModal === "create" && (
              <AddItemModal
                handleCloseModal={handleCloseModal}
                isOpen={activeModal === "create"}
                onAddItem={onAddItem}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal
                selectedCard={selectedCard}
                onClose={handleCloseModal}
                onDelete={handleRemoveCard}
              />
            )}
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={handleCloseModal}
              onRegister={handleRegister}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={handleCloseModal}
              onLogin={handleLogin}
            />
            <EditProfileModal
              isOpen={isEditProfileModalOpen}
              onClose={closeEditProfileModal}
              onUpdateUserProfile={handleUpdateUserProfile}
            />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
