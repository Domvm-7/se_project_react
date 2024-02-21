const baseUrl = "http://localhost:3001";

const api = {
  baseUrl: baseUrl,
  getItems: () => {
    return fetch(`${baseUrl}/items`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  },
  addItem: (name, imageUrl, weather) => {
    return fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, imageUrl, weather }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add item");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  },
  deleteItem: (id) => {
    return fetch(`${baseUrl}/items/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        console.log("Item deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  },
};

export default api;
