import axios from "axios";

const API_URL = "https://e-commerce-platform-backend-0zgb.onrender.com/api/products";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllProducts = () => api.get('/');
export const getProductById = (id) => api.get(`/${id}`);
export const addProduct = (product) => api.post('/', product);
export const updateProduct = (id, product) => api.put(`/${id}`, product);
export const deleteProduct = (id) => api.delete(`/${id}`);
