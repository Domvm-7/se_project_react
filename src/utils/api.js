// Api.js //
import { processServerResponse } from "./utils";

import { baseUrl } from "../utils/constants";

const api = {
  baseUrl: baseUrl,

  getItems: (token) => {
    return fetch(`${baseUrl}/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(processServerResponse);
  },

  addItem: (name, imageUrl, weather) => {
    const token = localStorage.getItem("jwt");
    return fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, imageUrl, weather }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      return response.json();
    });
  },

  deleteItem: (id) => {
    const token = localStorage.getItem("jwt");
    return fetch(`${baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      return response.json();
    });
  },

  updateUserProfile: ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    return fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  },

  addCardLike: (id, token) => {
    return fetch(`${baseUrl}/items/${id}/likes`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  },

  removeCardLike: (id, token) => {
    return fetch(`${baseUrl}/items/${id}/likes`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  },
};

export default api;
