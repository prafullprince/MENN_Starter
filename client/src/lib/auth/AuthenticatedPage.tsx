import { ProtectedPage } from "./ProtectedPage";

interface Props {
  children: React.ReactNode;
}

export function AuthenticatedPage({
  children,
}: Props) {
  return (
    <ProtectedPage>
      {children}
    </ProtectedPage>
  );
}
