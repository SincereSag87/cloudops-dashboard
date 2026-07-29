export type UserRole = "Admin" | "Operator" | "Viewer";

export type Permission =
  | "view-dashboard"
  | "view-servers"
  | "view-network"
  | "view-deployments"
  | "view-settings"
  | "start-deployment";

export const rolePermissions: Record<UserRole, Permission[]> = {
  Admin: [
    "view-dashboard",
    "view-servers",
    "view-network",
    "view-deployments",
    "view-settings",
    "start-deployment",
  ],

  Operator: [
    "view-dashboard",
    "view-servers",
    "view-network",
    "view-deployments",
    "start-deployment",
  ],

  Viewer: [
    "view-dashboard",
    "view-servers",
  ],
};

export function hasPermission(
  role: UserRole,
  permission: Permission,
): boolean {
  return rolePermissions[role].includes(permission);
}