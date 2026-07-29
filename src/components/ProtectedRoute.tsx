import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePermissions } from "../hooks/usePermissions";
import type { Permission } from "../types/Role";

type ProtectedRouteProps = {
  children: ReactNode;
  permission?: Permission;
};

export default function ProtectedRoute({
  children,
  permission,
}: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const { can } = usePermissions();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (permission && !can(permission)) {
    return <Navigate to="/" replace />;
  }

  return children;
}