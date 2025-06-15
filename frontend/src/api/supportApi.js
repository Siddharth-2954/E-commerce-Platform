import axios from "axios";

const API_URL = "http://localhost:3000/api/support";

export const createSupportTicket = (ticket) => axios.post(API_URL, ticket);
export const getUserSupportTickets = (userId) => axios.get(`${API_URL}/${userId}`);
