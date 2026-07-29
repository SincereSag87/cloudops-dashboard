import { useAuth } from "../context/AuthContext";
import {
  hasPermission,
  type Permission,
} from "../types/Role";

export function usePermissions() {
  const { user } = useAuth();

  function can(permission: Permission): boolean {
    if (!user) {
      return false;
    }

    return hasPermission(user.role, permission);
  }

  return {
    can,
    role: user?.role ?? "Viewer",
  };
}