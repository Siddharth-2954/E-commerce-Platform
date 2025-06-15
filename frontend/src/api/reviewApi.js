import axios from "axios";

const API_URL = "http://localhost:3000/api/reviews";

const reviewApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
reviewApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
reviewApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const getReviews = async () => {
  try {
    const response = await reviewApi.get("/");
    return response;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const getProductReviews = async (productId) => {
  try {
    const response = await reviewApi.get(`/product/${productId}`);
    return response;
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    throw error;
  }
};

export const createReview = async (reviewData) => {
  try {
    const response = await reviewApi.post("/", reviewData);
    return response;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await reviewApi.put(`/${reviewId}`, reviewData);
    return response;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await reviewApi.delete(`/${reviewId}`);
    return response;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
