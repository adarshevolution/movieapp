import React, { useEffect } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
