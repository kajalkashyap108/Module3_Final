import React, { createContext, useState } from "react";
import { loginUser } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password);
      if (response.success) {
        setIsAuthenticated(true);
        setUser({
          userId: response.userId,
          username: response.username,
          token: response.token,
        });
        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};