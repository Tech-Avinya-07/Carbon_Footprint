import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../src/store/auth";

function Logout() {
  const { logoutUser } = useAuth();

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Navigate to={"/"} />;
}

export default Logout;
