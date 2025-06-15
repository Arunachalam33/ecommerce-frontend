import React, { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); // NEW
  
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // ✅ persist user
        setAuthenticated(true);
      } catch (err) {
        console.error("Invalid token", err);
        setAuthenticated(false);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  function login(token) {
    localStorage.setItem("token", token);
    const userData = jwtDecode(token);
      setUser(userData);
    setAuthenticated(true);
    
  }

  function logout() {
    localStorage.removeItem("token");
    setAuthenticated(false);
    setUser(null);
  }

  // Show loading UI (or nothing) until auth check finishes
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout ,user}}>
      {children}
    </AuthContext.Provider>
  );
}
