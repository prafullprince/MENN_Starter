import { USER_ROLES } from "@/lib/auth/roles";
import { ProtectedPage } from "../ProtectedPage";

interface Props {
  children: React.ReactNode;
}

export function InvestorProtectedPage({
  children,
}: Props) {
  return (
    <ProtectedPage roles={[USER_ROLES.INVESTOR]}>
      {children}
    </ProtectedPage>
  );
}
