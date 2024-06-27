import axios from "axios";

import { BASE_URL_LOGIN } from "./baseURL";

const api = axios.create({
  baseURL: BASE_URL_LOGIN,
  headers: {
    "Content-Type": "application/json", // Add Accept header for application/json
  },
});

// Set the Authorization header for requests requiring authentication
export const setAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  };

  export const postUser = async (userData) => {
    try {
      setAuthHeaders();
      const response = await api.post("user/postuser", userData);
      return response.data;
    } catch (error) {
      console.error("Error posting user:", error.message);
      throw new Error("Failed to post user");
    }
  };
  
  export const loginUser = async (loginData) => {
    try {
      const response = await api.post(`/user/login`, loginData);  
      const { token } = response.data;
      localStorage.setItem("token", token);
      setAuthHeaders(); // Add this line
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw new Error("Failed to login");
    }
  };
  