import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://votre-api.com",
  headers: {
    "WP-API-KEY": process.env.REACT_APP_API_KEY,
    "Content-Type": "application/json",
  },
});

export default apiClient;
