import axios from "axios";

const API_URL = "http://localhost:3000/api/cart";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Cart API functions
export const getCart = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    throw new Error("User not logged in");
  }
  try {
    return await api.get(`/${userId}`);
  } catch (error) {
    console.error("Get cart error:", error);
    throw error;
  }
};

export const addToCart = async (productId, quantity = 1) => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    throw new Error("User not logged in");
  }
  if (!productId) {
    throw new Error("Product ID is required");
  }
  try {
    return await api.post("/", {
      userId,
      products: [{
        productId,
        quantity: Number(quantity)
      }]
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error;
  }
};

export const updateCartItem = async (itemId, quantity) => {
  if (!itemId) {
    throw new Error("Item ID is required");
  }
  if (!quantity || quantity < 1) {
    throw new Error("Valid quantity is required");
  }
  try {
    return await api.put(`/${itemId}`, { quantity: Number(quantity) });
  } catch (error) {
    console.error("Update cart item error:", error);
    throw error;
  }
};

export const removeCartItem = async (itemId) => {
  if (!itemId) {
    throw new Error("Item ID is required");
  }
  try {
    return await api.delete(`/${itemId}`);
  } catch (error) {
    console.error("Remove cart item error:", error);
    throw error;
  }
};
