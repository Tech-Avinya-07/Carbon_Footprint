import { createContext, useContext, useState } from "react";
import Navbar from "../components/Navbar";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToke] = useState(localStorage.getItem("token"));
  const isLogedIn = !!token;

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    return setToke(serverToken);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    return setToke(null);
  };

  return (
    <AuthContext.Provider value={{ isLogedIn, logoutUser, storeTokenInLS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
