// Auth.js //
import { Redirect } from "react-router-dom";

import { baseUrl } from "../utils/constants";

const authApi = ({ children }) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return <Redirect to="/" />;
  }
  return <>{children}</>;
};

export const getUserData = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      throw error;
    });
};

export const signUp = (name, email, password, avatar) => {
  return fetch(`${baseUrl}/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatar }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("SignUp failed");
      }
      return response.json();
    })
    .then((data) => {
      return data; // Ensure you return the data received from the server
    })
    .catch((error) => {
      console.error("Error signing up:", error);
      throw error; // Propagate the error to the caller
    });
};

export const signIn = (email, password) => {
  return fetch(`${baseUrl}/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("SignIn failed");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error signing in:", error);
      throw error; // Propagate the error to the caller
    });
};

export default authApi;
