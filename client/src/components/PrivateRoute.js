import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ allowedRoles, children }) {
  const { auth } = useSelector((state) => ({ ...state }));

  if (!auth) {
    return <Navigate to="/login" />;
  }
  return allowedRoles.includes(auth.user.role) ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
}
