import { createContext, useState, useEffect } from "react";
import axios from "axios";
import API_url from "../config/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const register = async (fullname, email, password) => {
    const response = await axios.post(`${API_url}/api/register`, {
      fullname,
      email,
      password,
    });
    return response.data;
  };

  const login = async (email, password) => {
    const response = await axios.post(
      `${API_url}/api/login`,
      { email, password },
      { withCredentials: true }
    );
    const data = response.data;
    setUser(data.user);
    // Store user in localStorage
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  };

  const logout = async () => {
    await axios.post(`${API_url}/api/logout`, {}, { withCredentials: true });
    setUser(null);
    // Remove user from localStorage
    localStorage.removeItem("user");
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${API_url}/api/dashboard`, {
        withCredentials: true,
      });
      // Update both state and localStorage
      setUser(res.data.user);
      console.log(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.log("Auth check error:", err);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ register, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
