import axios from "axios";

const API_URL = "https://e-commerce-platform-backend-0zgb.onrender.com/api/support";

export const createSupportTicket = (ticket) => axios.post(API_URL, ticket);
export const getUserSupportTickets = (userId) => axios.get(`${API_URL}/${userId}`);
