import { USER_ROLES, type UserRole } from "./roles";

export type RouteAccess =
  | "public"
  | "authenticated"
  | "role";

export interface ProtectedRoute {
  path: string;
  access: RouteAccess;
  roles?: UserRole[];
}

export const ROUTES: ProtectedRoute[] = [
  // Public
  {
    path: "/",
    access: "public",
  },
  {
    path: "/about",
    access: "public",
  },
  {
    path: "/contact",
    access: "public",
  },
  {
    path: "/login",
    access: "public",
  },
  {
    path: "/signup",
    access: "public",
  },

  //___________________Any authenticated user______________
  {
    path: "/dashboard",
    access: "authenticated",
  },

  //___________________Role protected__________________
  {
    path: "/admin",
    access: "role",
    roles: [USER_ROLES.ADMIN],
  },
  {
    path: "/investor",
    access: "role",
    roles: [USER_ROLES.INVESTOR],
  },
  {
    path: "/customer",
    access: "role",
    roles: [USER_ROLES.CUSTOMER],
  },
  {
    path: "/employee",
    access: "role",
    roles: [USER_ROLES.EMPLOYEE],
  },
  {
    path: "/intern",
    access: "role",
    roles: [USER_ROLES.INTERN],
  },
];
