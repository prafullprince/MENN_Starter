import { USER_ROLES } from "@/lib/auth/roles";
import { ProtectedPage } from "../ProtectedPage";

interface Props {
  children: React.ReactNode;
}

export function CustomerProtectedPage({
  children,
}: Props) {
  return (
    <ProtectedPage roles={[USER_ROLES.CUSTOMER]}>
      {children}
    </ProtectedPage>
  );
}
