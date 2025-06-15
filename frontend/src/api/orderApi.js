import axios from "axios";

const API_URL = "https://e-commerce-platform-backend-0zgb.onrender.com/api/orders";

// Create axios instance with base URL
const orderApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
orderApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Adding token to request:", token);
  } else {
    console.log("No token found in localStorage");
  }
  return config;
});

// Add response interceptor to handle auth errors
orderApi.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.log("Unauthorized access, clearing storage");
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Create a new order
export const createOrder = async (orderData) => {
  try {
    console.log("Creating order with data:", orderData);
    const response = await orderApi.post("/", orderData);
    console.log("Order created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Create order error:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to create order";
  }
};

// Get all orders for the current user
export const getOrders = async () => {
  try {
    console.log("Fetching orders...");
    const response = await orderApi.get("/");
    console.log("Orders fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get orders error:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch orders";
  }
};

// Get a specific order by ID
export const getOrderById = async (orderId) => {
  try {
    console.log("Fetching order by ID:", orderId);
    const response = await orderApi.get(`/${orderId}`);
    console.log("Order fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get order by ID error:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch order";
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    console.log("Updating order status:", { id, status });
    const response = await orderApi.put(`/${id}`, { status });
    console.log("Order status updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update order status error:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to update order status";
  }
};
