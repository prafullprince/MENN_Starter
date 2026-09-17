import { redirect } from "next/navigation";
import type { UserRole } from "@/lib/auth/roles";

interface ProtectedPageProps {
  children: React.ReactNode;
  roles?: UserRole[];
  user?: {
    id: string;
    role: UserRole;
  } | null;
}

export async function ProtectedPage({
  children,
  roles,
  user,
}: ProtectedPageProps) {
  if (!user) {
    redirect("/login");
  }

  if (roles && !roles.includes(user.role)) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
