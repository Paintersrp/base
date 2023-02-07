import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = useSelector((state) => state.auth);

  return auth.is_authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
