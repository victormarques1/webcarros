'use client'

import { ReactNode, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface PrivateProps {
  children: ReactNode;
}

export default function Private({ children }: PrivateProps): any {
  const router = useRouter();
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <div></div>;
  }

  if (!signed) {
    return router.push("/login");
  }
  return children;
}
