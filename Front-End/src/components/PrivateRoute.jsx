import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function PrivateRoute({ children, roles = [] }) {
  const { currentUser } = useUser();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (roles.length && !roles.includes(currentUser.roleId)) return <Navigate to="/login" replace />;

  return children;
}
