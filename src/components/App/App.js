// App.jsx
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import authApi from "../../utils/auth";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { parseWeatherData, getForecastWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { signIn, signUp } from "../../utils/auth";

function App() {
  const [cards, setCards] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCreateModal = () => {
    setActiveModal("create");
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
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          handleCloseModal();
        }
      })
      .catch((error) => {
        console.error("Error registering:", error);
      });
  };

  const handleLogin = (formData) => {
    signIn(formData.email, formData.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          handleCloseModal();
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      authApi
        .getUserData(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error("Error checking user authentication:", error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
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

  return (
    <BrowserRouter>
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
              />
            </Route>
            <Route path="/profile">
              {isLoggedIn ? (
                <authApi>
                  <Profile
                    onCreateModal={handleCreateModal}
                    cards={cards}
                    onSelectCard={handleSelectedCard}
                    onAddItem={onAddItem}
                  />
                </authApi>
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
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
