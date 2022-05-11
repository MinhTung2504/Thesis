import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth && auth.token ? children : <Navigate to="/login" />;
}
