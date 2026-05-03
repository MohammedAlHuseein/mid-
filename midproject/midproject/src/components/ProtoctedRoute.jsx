import React, { Children, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to={"/"} />;
  }
  if (
    user.type !== "agency" &&
    window.location.pathname === "/AgencyDashboard"
  ) {
    return <Navigate to="/Home" />;
  }
  return children;
};
export default ProtectedRoute;
