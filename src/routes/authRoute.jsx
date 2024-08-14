import Parse from "parse";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return Parse.User.current() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
