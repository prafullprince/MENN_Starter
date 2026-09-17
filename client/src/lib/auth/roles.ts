export const USER_ROLES = {
  ADMIN: "admin",
  INVESTOR: "investor",
  CUSTOMER: "customer",
  EMPLOYEE: "employee",
  INTERN: "intern",
} as const;

export type UserRole =
  (typeof USER_ROLES)[keyof typeof USER_ROLES];