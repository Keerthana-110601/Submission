import React, { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ba_currentUser")) || null;
    } catch {
      return null;
    }
  });

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("ba_currentUser", JSON.stringify(user));
  };
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("ba_currentUser");
  };

  const value = useMemo(() => ({ currentUser, setCurrentUser, login, logout }), [currentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
