import React from "react";
import { Redirect } from "react-router-dom";

const baseUrl = "http://localhost:3001";

const authApi = ({ children }) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return <Redirect to="/" />;
  }
  return <>{children}</>;
};

export const signUp = (name, email, password, avatar) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatar }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error signing up:", error);
      throw error; // Propagate the error to the caller
    });
};

export const signIn = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Signin failed");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error signing in:", error);
      throw error; // Propagate the error to the caller
    });
};

export default authApi;