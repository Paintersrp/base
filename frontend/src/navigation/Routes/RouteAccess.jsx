import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const auth = useSelector((state) => state.auth);

  return auth.is_authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoute = () => {
  const auth = useSelector((state) => state.auth);

  return <Outlet />;
};

export const AdminRoute = () => {
  const auth = useSelector((state) => state.auth);

  return auth.is_superuser ? <Outlet /> : <Navigate to="/login" />;
};
